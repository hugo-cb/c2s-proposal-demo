"""
Notifications package for sending messages through different channels.

This module provides a flexible notification system that can send messages
through various channels such as console, email, SMS, etc.
"""

from notifications.base import (
    NotificationLevel, 
    NotificationMessage, 
    NotificationChannel,
    NotificationService
)
from notifications.channels import ConsoleNotificationChannel

__all__ = [
    'NotificationLevel',
    'NotificationMessage',
    'NotificationChannel',
    'NotificationService',
    'ConsoleNotificationChannel',
]