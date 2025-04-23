"""
Example demonstrating the notification system with structlog integration.
"""

import os
import sys

# Add the project root to the Python path
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, project_root)

from notifications.logger import debug, info, warning, error, critical
from utils.log_config import get_logger

# Get a logger for this module
logger = get_logger("example")


def run_example():
    """Run a demonstration of the notification system with structlog."""
    print("\n=== Structlog Integration Example ===\n")

    # Basic usage with different log levels
    debug("Starting analysis process", repository="example-repo")
    info("Repository cloned successfully", repository="example-repo", branch="main",
         commit="abc123")
    warning("Missing test coverage", repository="example-repo", module="auth",
            coverage=65.4)
    error("Failed to analyze module", repository="example-repo", module="payment",
          error_code="ERR-1001")
    critical("Security vulnerability detected",
             repository="example-repo",
             severity="high",
             cve="CVE-2023-1234",
             affected_files=3)

    # Example with complex metadata
    info("Analysis completed",
         repository="example-repo",
         duration_ms=1250,
         stats={
             "files_analyzed": 127,
             "issues": {
                 "critical": 1,
                 "high": 3,
                 "medium": 8,
                 "low": 12
             }
         })

    # Example of exception logging
    try:
        result = 1 / 0
    except Exception as e:
        error("Exception occurred during calculation",
              repository="example-repo",
              operation="division",
              exc_info=True)

    # Direct use of structlog
    logger.info("This is a direct structlog message",
                context="example",
                using="direct logger")


if __name__ == "__main__":
    run_example()
