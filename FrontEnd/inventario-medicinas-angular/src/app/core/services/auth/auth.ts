import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { 
  CognitoIdentityProviderClient, 
  InitiateAuthCommand, 
  SignUpCommand, 
  ConfirmSignUpCommand,
  RespondToAuthChallengeCommand
} from "@aws-sdk/client-cognito-identity-provider";
import { from, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private clientId = '45gve9g66fhqb8lop341fth7vt';
  private region = 'us-east-1';
  private client = new CognitoIdentityProviderClient({ region: this.region });
  private router = inject(Router);

  constructor() {}

  public login(email: string, password: string): Observable<any> {
    const command = new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password
      }
    });
    return from(this.client.send(command)).pipe(
      map(response => {
        if(response.AuthenticationResult) {
           localStorage.setItem('access_token', response.AuthenticationResult.AccessToken || '');
           localStorage.setItem('id_token', response.AuthenticationResult.IdToken || '');
        }
        // Devuelve toda la respuesta para poder evaluar si viene un Challenge (MFA)
        return response;
      })
    );
  }

  public respondToMfaChallenge(username: string, code: string, session: string, challengeName: string): Observable<any> {
    const command = new RespondToAuthChallengeCommand({
      ClientId: this.clientId,
      ChallengeName: challengeName as any,
      Session: session,
      ChallengeResponses: {
        USERNAME: username,
        [challengeName === 'SOFTWARE_TOKEN_MFA' ? 'SOFTWARE_TOKEN_MFA_CODE' : 'SMS_MFA_CODE']: code
      }
    });
    return from(this.client.send(command)).pipe(
      map(response => {
        if(response.AuthenticationResult) {
           localStorage.setItem('access_token', response.AuthenticationResult.AccessToken || '');
           localStorage.setItem('id_token', response.AuthenticationResult.IdToken || '');
        }
        return response;
      })
    );
  }

  public registerUser(user: any): Observable<any> {
    const command = new SignUpCommand({
      ClientId: this.clientId,
      Username: user.email,
      Password: user.password,
      UserAttributes: [
        { Name: 'given_name', Value: user.given_name },
        { Name: 'family_name', Value: user.family_name },
        { Name: 'birthdate', Value: user.birthdate },
        { Name: 'email', Value: user.email }
      ]
    });
    return from(this.client.send(command));
  }

  public confirmRegistration(email: string, code: string): Observable<any> {
    const command = new ConfirmSignUpCommand({
      ClientId: this.clientId,
      Username: email,
      ConfirmationCode: code
    });
    return from(this.client.send(command));
  }

  public isAuthenticated(): Observable<boolean> {
    return from(Promise.resolve(!!localStorage.getItem('access_token')));
  }

  public getUserProfile(): any {
    const idToken = localStorage.getItem('id_token');
    if (!idToken) return null;

    try {
      // Un JWT tiene 3 partes separadas por punto: header.payload.signature
      const payloadBase64 = idToken.split('.')[1];
      // Decodificamos el payload en base64
      const decodedPayload = atob(payloadBase64);
      return JSON.parse(decodedPayload);
    } catch (e) {
      console.error('Error decoding ID token', e);
      return null;
    }
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    this.router.navigate(['/login']);
  }
}
