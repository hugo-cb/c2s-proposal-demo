from typing import Optional

from notifications.logger import info


def greet_user(name: str) -> dict:
    info("Greeting user")
    return {"message": f"Hello, {name}!"}


def clone_repo(repo_url: str, branch: Optional[str] = "main"):
    info(f"Cloned repository from {repo_url} (branch: {branch})")
