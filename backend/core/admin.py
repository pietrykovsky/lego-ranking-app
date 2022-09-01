from django.contrib import admin, messages
from django.contrib.auth.models import User
from django.db.models.functions import Round
from django.db.models import ExpressionWrapper, F, DecimalField, When, Value, Case
from django.template.defaultfilters import pluralize
from django.utils.translation import gettext_lazy as _

from kombu.utils.json import loads

from celery import current_app

from django_celery_beat.models import CrontabSchedule, IntervalSchedule, PeriodicTask, PeriodicTasks

from legoscraper.models import LegoSet, Theme, AgeCategory

class LegoAdminSite(admin.AdminSite):
    """Custom admin panel display."""
    site_header = 'Lego Ranking Admin Panel'
    site_title = 'Lego Ranking Administation'
    index_title = site_title

class LegoSetAdmin(admin.ModelAdmin):
    """Custom lego set display in admin panel."""
    empty_value_display = 'None'
    readonly_fields = ('updated', 'price_per_element', 'available')
    list_display = ('title', 'theme', 'price', 'elements', 'price_per_element', 'available', 'updated')
    list_filter = ('theme__name', 'age__name', 'available')
    search_fields = ('title', 'theme__name')

    @admin.display(ordering='price_per_element', empty_value='???')
    def price_per_element(self, obj):
        return obj.price_per_element

    def get_queryset(self, request):
        """Return the lego set queryset ordered by price per element ratio ascending."""
        queryset = LegoSet.objects.annotate(price_per_element=ExpressionWrapper(Round(F('price')/F('elements'), 2), output_field=DecimalField())).order_by('price_per_element')

        return queryset

class PeriodicTaskAdmin(admin.ModelAdmin):
    """Admin-interface for periodic tasks."""

    celery_app = current_app
    date_hierarchy = 'start_time'
    list_display = ('__str__', 'enabled', 'interval', 'start_time',
                    'last_run_at', 'one_off')
    list_filter = ['enabled', 'one_off', 'task', 'start_time', 'last_run_at']
    actions = ('enable_tasks', 'disable_tasks', 'toggle_tasks', 'run_tasks')
    search_fields = ('name',)
    readonly_fields = (
        'last_run_at',
    )

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.select_related('interval', 'crontab', 'solar', 'clocked')


    def _message_user_about_update(self, request, rows_updated, verb):
        """Send message about action to user.

        `verb` should shortly describe what have changed (e.g. 'enabled').

        """
        self.message_user(
            request,
            _('{0} task{1} {2} successfully {3}').format(
                rows_updated,
                pluralize(rows_updated),
                pluralize(rows_updated, _('was,were')),
                verb,
            ),
        )

    def enable_tasks(self, request, queryset):
        rows_updated = queryset.update(enabled=True)
        PeriodicTasks.update_changed()
        self._message_user_about_update(request, rows_updated, 'enabled')

    enable_tasks.short_description = _('Enable selected tasks')

    def disable_tasks(self, request, queryset):
        rows_updated = queryset.update(enabled=False, last_run_at=None)
        PeriodicTasks.update_changed()
        self._message_user_about_update(request, rows_updated, 'disabled')

    disable_tasks.short_description = _('Disable selected tasks')

    def _toggle_tasks_activity(self, queryset):
        return queryset.update(enabled=Case(
            When(enabled=True, then=Value(False)),
            default=Value(True),
        ))

    def toggle_tasks(self, request, queryset):
        rows_updated = self._toggle_tasks_activity(queryset)
        PeriodicTasks.update_changed()
        self._message_user_about_update(request, rows_updated, 'toggled')

    toggle_tasks.short_description = _('Toggle activity of selected tasks')

    def run_tasks(self, request, queryset):
        self.celery_app.loader.import_default_modules()
        tasks = [(self.celery_app.tasks.get(task.task),
                  loads(task.args),
                  loads(task.kwargs),
                  task.queue,
                  task.name)
                 for task in queryset]

        if any(t[0] is None for t in tasks):
            for i, t in enumerate(tasks):
                if t[0] is None:
                    break

            # variable "i" will be set because list "tasks" is not empty
            not_found_task_name = queryset[i].task

            self.message_user(
                request,
                _('task "{0}" not found'.format(not_found_task_name)),
                level=messages.ERROR,
            )
            return

        task_ids = [
            task.apply_async(args=args, kwargs=kwargs, queue=queue,
                             periodic_task_name=periodic_task_name)
            if queue and len(queue)
            else task.apply_async(args=args, kwargs=kwargs,
                                  periodic_task_name=periodic_task_name)
            for task, args, kwargs, queue, periodic_task_name in tasks
        ]
        tasks_run = len(task_ids)
        self.message_user(
            request,
            _('{0} task{1} {2} successfully run').format(
                tasks_run,
                pluralize(tasks_run),
                pluralize(tasks_run, _('was,were')),
            ),
        )

    run_tasks.short_description = _('Run selected tasks')

class TaskAdmin(admin.ModelAdmin):
    """Custom task display in admin panel."""
    list_display = ('name', 'schedule','last_run_at', 'enabled')

lego_admin = LegoAdminSite(name = 'lego-admin')

lego_admin.register(LegoSet, LegoSetAdmin)
lego_admin.register(Theme)
lego_admin.register(AgeCategory)
lego_admin.register(PeriodicTask, PeriodicTaskAdmin)
lego_admin.register(CrontabSchedule)
lego_admin.register(IntervalSchedule)
lego_admin.register(User)