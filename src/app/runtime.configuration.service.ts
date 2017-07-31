import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs, RequestOptions } from '@angular/http';

export interface RuntimeConfiguration {
    yadomsServer: {
        restUrl: string;
    };
}

@Injectable()
export class RuntimeConfigurationService {
    private configFileName: string = 'gssconfig.json';

    /**
     * The default configuration schema
     */
    private defaultConfiguration: RuntimeConfiguration = {
        yadomsServer : {
            restUrl : ''
        }
    };

    private currentConfiguration: RuntimeConfiguration = null;

    constructor(private http: Http) {
    }

    public load(): Promise<RuntimeConfiguration> {
        return new Promise<RuntimeConfiguration>( (resolve, reject) => {
            if (this.currentConfiguration === null) {
                console.log('Loading configuration from : ' + this.configFileName);
                this .http
                    .request(this.configFileName)
                    .share()
                    .retry(0)
                    .timeout(90000)
                    .subscribe( (res: Response) => {
                        try {
                            const readCfg = res.json();
                            this.currentConfiguration = readCfg;
                            console.log(readCfg);
                            resolve(this.currentConfiguration);
                        } catch (error) {
                            console.error('Fail to parse gssconfig.json : ' + error, error);
                            this.currentConfiguration = this.defaultConfiguration;
                            resolve(this.currentConfiguration);
                        }
                    }, (ex) => {
                        console.error('Fail to get gssconfig.json : ' + ex, ex);
                        this.currentConfiguration = this.defaultConfiguration;
                        resolve(this.currentConfiguration);
                    });
            } else {
                resolve(this.currentConfiguration);
            }
        });
    }

    /**
     * Get the configuration values from 'gssconfig.json'
     */
    public get(): RuntimeConfiguration {
        return this.currentConfiguration;
    }
}
