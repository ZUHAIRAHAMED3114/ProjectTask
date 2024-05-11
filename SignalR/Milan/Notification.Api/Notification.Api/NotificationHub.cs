using Microsoft.AspNetCore.SignalR;

namespace Notification.Api
{
    public class NotificationHub:Hub<INotificationClient>
    {
        public override Task OnConnectedAsync()
        {
            var notificationClient = Clients.Client(Context.ConnectionId);
            notificationClient.RecieveNotification($"Thank You For Connecting {Context.User?.Identity?.Name}");
            return base.OnConnectedAsync();
        }
    }
}
