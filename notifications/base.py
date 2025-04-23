from abc import ABC, abstractmethod
from datetime import datetime
from enum import Enum
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class NotificationLevel(Enum):
    """Enum for notification levels."""
    DEBUG = "debug"
    INFO = "info"
    WARNING = "warning"
    ERROR = "error"
    CRITICAL = "critical"


class NotificationMessage(BaseModel):
    """Data structure for notification messages."""
    message: str
    level: NotificationLevel = NotificationLevel.INFO
    timestamp: datetime = Field(default_factory=datetime.now)
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict)


class NotificationChannel(ABC):
    """Abstract base class for notification channels."""
    
    @abstractmethod
    def send(self, notification: NotificationMessage) -> bool:
        """
        Send a notification message through this channel.
        
        Args:
            notification: The notification message to send
            
        Returns:
            bool: True if the message was sent successfully, False otherwise
        """
        pass


class NotificationService:
    """
    Service for sending notifications to registered channels.
    """

    def __init__(self):
        self._channels: Dict[str, NotificationChannel] = {}

    def register_channel(self, name: str, channel: NotificationChannel) -> None:
        """
        Register a notification channel.

        Args:
            name: Unique name for the channel
            channel: The channel instance
        """
        self._channels[name] = channel

    def unregister_channel(self, name: str) -> None:
        """
        Unregister a notification channel.

        Args:
            name: Name of the channel to unregister
        """
        if name in self._channels:
            del self._channels[name]

    def send(self, notification: NotificationMessage,
             channels: Optional[List[str]] = None) -> Dict[str, bool]:
        """
        Send a notification to one or more channels.

        Args:
            notification: The notification message to send
            channels: List of channel names to send to, or None for all channels

        Returns:
            Dict mapping channel names to success status
        """
        results = {}
        target_channels = channels or list(self._channels.keys())

        for channel_name in target_channels:
            if channel_name in self._channels:
                success = self._channels[channel_name].send(notification)
                results[channel_name] = success
            else:
                results[channel_name] = False

        return results
