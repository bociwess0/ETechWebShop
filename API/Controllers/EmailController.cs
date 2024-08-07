using API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class EmailController : ControllerBase
{
    private readonly EmailService _emailService;

    public EmailController(EmailService emailService)
    {
        _emailService = emailService;
    }

    [HttpPost("send-email")]
    public async Task<IActionResult> SendEmail([FromBody] EmailRequest emailRequest)
    {
        await _emailService.SendEmailAsync(emailRequest.Email, emailRequest.OrderId);
        return Ok("Email sent successfully");
    }

    [HttpPost("send-email-user-update")]
    public async Task<IActionResult> SendEmailUserUpdate([FromBody] EmailRequest emailRequest)
    {
        await _emailService.SendEmailUserUpdate(emailRequest.Email);
        return Ok("Email sent successfully");
    }

    [HttpPost("send-email-order-status")]
    public async Task<IActionResult> SendEmailOrderStatus([FromBody] EmailRequest emailRequest)
    {
        await _emailService.SendEmailOrderStatus(emailRequest.Email, emailRequest.Message);
        return Ok("Email sent successfully");
    }
}

public class EmailRequest
{
    public string Email { get; set; }
    public string Message { get; set; }
    public int OrderId { get; set; }
}
