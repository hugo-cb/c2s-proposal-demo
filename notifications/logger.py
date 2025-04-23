"""
Utility functions for working with the notification system.
"""

from typing import Any, Dict, Optional, List

from .base import NotificationLevel, NotificationMessage, NotificationService
from .channels import ConsoleNotificationChannel

# Singleton instance of NotificationService for app-wide use
notification_service = NotificationService()

# Register default channels
notification_service.register_channel("console", ConsoleNotificationChannel())


def notify(
    message: str,
    level: NotificationLevel = NotificationLevel.INFO,
    channels: Optional[List[str]] = None,
    **kwargs,
) -> Dict[str, bool]:
    notification = NotificationMessage(
        message=message,
        level=level,
        metadata=kwargs,
    )
    return notification_service.send(notification, channels)


def debug(
        message: str,
        channels: Optional[List[str]] = None,
        **kwargs,
) -> Dict[str, bool]:
    """
    Send a debug notification.

    Args:
        message: The message to send
        channels: Optional list of channels to send to (defaults to all)
        kwargs: Optional metadata for the notification

    Returns:
        Dict mapping channel names to success status
    """
    return notify(
        message=message,
        level=NotificationLevel.DEBUG,
        channels=channels,
        **kwargs,
    )


def info(
    message: str, channels: Optional[List[str]] = None, **kwargs
) -> Dict[str, bool]:
    """
    Send an info notification.
    
    Args:
        message: The message to send
        channels: Optional list of channels to send to (defaults to all)
        kwargs: Optional metadata for the notification
        
    Returns:
        Dict mapping channel names to success status
    """
    return notify(message=message, channels=channels, **kwargs)


def warning(
    message: str, channels: Optional[List[str]] = None, **kwargs,
) -> Dict[str, bool]:
    """
    Send a warning notification.
    
    Args:
        message: The message to send
        channels: Optional list of channels to send to (defaults to all)
        kwargs: Additional keyword arguments for the notification
        
    Returns:
        Dict mapping channel names to success status
    """
    return notify(
        message=message,
        level=NotificationLevel.WARNING,
        channels=channels,
        **kwargs
    )


def error(
    message: str, channels: Optional[List[str]] = None, **kwargs
) -> Dict[str, bool]:
    """
    Send an error notification.
    
    Args:
        message: The message to send
        channels: Optional list of channels to send to (defaults to all)
        kwargs: Additional keyword arguments for the notification
        
    Returns:
        Dict mapping channel names to success status
    """
    return notify(
        message=message,
        level=NotificationLevel.ERROR,
        channels=channels,
        **kwargs
    )


def critical(
    message: str, channels: Optional[List[str]] = None, **kwargs
) -> Dict[str, bool]:
    """
    Send a critical notification.
    
    Args:
        message: The message to send
        channels: Optional list of channels to send to (defaults to all)
        kwargs: Additional keyword arguments for the notification
        
    Returns:
        Dict mapping channel names to success status
    """
    return notify(
        message=message,
        level=NotificationLevel.CRITICAL,
        channels=channels,
        **kwargs,
    )
