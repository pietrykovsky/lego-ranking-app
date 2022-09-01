from django.contrib.admin.apps import AdminConfig

class LegoAdminConfig(AdminConfig):
    """Custom admin panel configuration."""
    default_site = 'core.admin.LegoAdminSite'