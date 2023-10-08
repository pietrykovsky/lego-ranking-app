import os
from shutil import which


PROD_RUN = "docker compose -f docker-compose.yml up --build"
DEV_RUN = (
    "docker compose -f docker-compose.yml -f docker-compose.override.yml up --build"
)


def env_exists() -> bool:
    return os.path.exists(".env")


def is_dev_mode() -> bool:
    with open(".env", "r") as file:
        content = file.read()
    return "DEV=true" in content


def docker_available() -> bool:
    docker = which("docker") is not None
    docker_compose = which("docker-compose") is not None
    if not docker:
        print("Docker not found")
    elif not docker_compose:
        print("Docker Compose not found")
    return docker and docker_compose


def run():
    if not docker_available:
        return
    if env_exists():
        if is_dev_mode():
            print("Running in development mode")
            os.system(DEV_RUN)
        else:
            os.system(PROD_RUN)
    else:
        print("No .env file found")


if __name__ == "__main__":
    run()
