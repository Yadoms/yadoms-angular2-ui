import { ErrorInfo } from '../error.service';

export class AuthenticationResult {
  public authenticated: boolean;
  public errorInfo: string | ErrorInfo;

  constructor(result: boolean, error?: string | ErrorInfo) {
    this.authenticated = result;
    this.errorInfo = error;
  }
}
