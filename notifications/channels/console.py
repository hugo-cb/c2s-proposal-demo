import sys
import inspect

from notifications.base import NotificationChannel, NotificationMessage
from utils.log_config import get_logger


class ConsoleNotificationChannel(NotificationChannel):
    """
    A notification channel that outputs messages to the console using structlog formatting.
    """
    
    def __init__(
        self, 
        timestamp_format: str = "%Y-%m-%d %H:%M:%S",
        output=sys.stdout
    ):
        """
        Initialize the console notification channel.
        
        Args:
            timestamp_format: Format string for timestamps
            output: Stream to write to (defaults to stdout)
        """
        self.timestamp_format = timestamp_format
        self.output = output
        
        # Initialize structlog logger
        self.logger = get_logger("notifications.console")
    
    def send(self, notification: NotificationMessage) -> bool:
        """
        Send a notification message to the console using structlog.
        
        Args:
            notification: The notification message to send
            
        Returns:
            bool: True if successful
        """
        try:
            # Get the appropriate log method based on level
            log_method = getattr(self.logger, notification.level.value)
            
            # Extract metadata as kwargs for structlog
            kwargs = notification.metadata or {}
            
            # Add timestamp if not in metadata
            if 'timestamp' not in kwargs:
                kwargs['timestamp'] = notification.timestamp.strftime(self.timestamp_format)
            
            # Add source location information (caller's file and line)
            frame = inspect.currentframe()
            # Go back frames to find the caller outside of the notification system
            caller_frame = None
            if frame:
                try:
                    # Start with the parent frame
                    frame = frame.f_back
                    while frame:
                        module_name = frame.f_globals.get('__name__', '')
                        # Skip frames from the notifications package
                        if not module_name.startswith('notifications.'):
                            caller_frame = frame
                            break
                        frame = frame.f_back
                        
                    if caller_frame:
                        kwargs['pathname'] = caller_frame.f_code.co_filename
                        kwargs['lineno'] = caller_frame.f_lineno
                        kwargs['func_name'] = caller_frame.f_code.co_name
                finally:
                    # Clean up references to frames to avoid reference cycles
                    del frame
                    if caller_frame:
                        del caller_frame
            
            # Log the message with structlog
            log_method(notification.message, **kwargs)
            return True
            
        except Exception as e:
            # Log the error using structlog
            error_logger = get_logger("notifications.error")
            error_logger.error(
                "Failed to send notification", 
                error=str(e), 
                level=notification.level.value,
                message=notification.message
            )
            return False
