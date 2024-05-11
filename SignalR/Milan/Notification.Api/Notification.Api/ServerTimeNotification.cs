
using Microsoft.AspNetCore.SignalR;

namespace Notification.Api
{
    public class ServerTimeNotification : BackgroundService
    {
        private readonly ILogger<ServerTimeNotification> _logger;
        private readonly IHubContext<NotificationHub, INotificationClient> _context;
        private static readonly TimeSpan period = TimeSpan.FromSeconds(5);

        public ServerTimeNotification(ILogger<ServerTimeNotification> logger, IHubContext<NotificationHub, INotificationClient> context)
        {
            _logger = logger;
            _context = context;
        }

        
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            using var timer = new PeriodicTimer(period);
            while (!stoppingToken.IsCancellationRequested &&
                    await timer.WaitForNextTickAsync(stoppingToken)) {
                _logger.LogInformation("Executing {Service} {Time}", nameof(ServerTimeNotification), DateTime.Now);
                await _context.Clients.All.RecieveNotification($"Server Time ={DateTime.Now}");
            }
    
        }
    }
}
