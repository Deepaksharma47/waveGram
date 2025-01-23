export const signupInviteTemplate = (link: string,receiverName:string, senderName: string) => (`
    <!doctype html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Login Email</title>
    <style>
      /* Reusing the same styling as provided */
      body {
        font-family: Helvetica, sans-serif;
        -webkit-font-smoothing: antialiased;
        font-size: 16px;
        line-height: 1.3;
        background-color: #f4f5f6;
        margin: 0;
        padding: 0;
      }
      .container {
        margin: 0 auto;
        max-width: 600px;
        padding: 24px;
        width: 600px;
      }
      .main {
        background: #ffffff;
        border: 1px solid #eaebed;
        border-radius: 16px;
        width: 100%;
      }
      .wrapper {
        padding: 24px;
      }
      .btn-primary a {
        background-color: #0867ec;
        border-color: #0867ec;
        color: #ffffff;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 4px;
        font-size: 16px;
        font-weight: bold;
        display: inline-block;
      }
      .footer {
        text-align: center;
        padding-top: 24px;
        font-size: 14px;
        color: #9a9ea6;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <table class="main">
        <tr>
          <td class="wrapper">
            <p>Hello, ${receiverName}</p>
            <p>It seems you already have an account with us. Click the button below to log in and access from the name ${senderName}</p>
            <table role="presentation" class="btn btn-primary">
              <tr>
                <td>
                  <a href="${link}" target="_blank">Log In</a>
                </td>
              </tr>
            </table>
            <p>If you did not request this, please ignore this email or contact support.</p>
          </td>
        </tr>
      </table>
      <div class="footer">
        <p>Company Inc, 7-11 Commercial Ct, Belfast BT1 2NB</p>
        <p>Don’t like these emails? <a href="#">Unsubscribe</a>.</p>
      </div>
    </div>
  </body>
</html>
`
)