import { Injectable } from '@angular/core';
import { share } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

/**
 * Interface for the RuntimeConfiguration
 */
export interface RuntimeConfiguration {
    /**
     * The yadoms server url
     */
    yadomsServer: {
        restUrl: string;
    };
}

/**
 * Service which provide RuntimeConfiguration
 */
@Injectable()
export class RuntimeConfigurationService {
    /**
     * The local configuration file
     */
      //TODO utile ? C'est la même URL que le serveur qui fournit les pages. Et en debug, on utilise un proxy qui redirige les requêtes REST
      // vers le port 8080 (voir fichier proxy.conf.json)
    private configFileName = 'yadomsconfig.json';

    /**
     * The default configuration schema
     */
    private defaultConfiguration: RuntimeConfiguration = {
        yadomsServer : {
            restUrl : 'http://127.0.0.1:8080'
        }
    };

    /**
     * The current configuration
     */
    private currentConfiguration: RuntimeConfiguration = null;

    /**
     * Constructor
     * @param http The http service (dependency injection)
     */
    constructor(private http: HttpClient) {
    }

    /**
     * Load the configuration file and initialize a RuntimeConfiguration object
     */
    public load(): Promise<RuntimeConfiguration> {
        return new Promise<RuntimeConfiguration>( (resolve, reject) => {
            if (this.currentConfiguration === null) {
                console.log('Loading configuration from : ' + this.configFileName);
                this .http
                    .get<RuntimeConfiguration>(this.configFileName)
                    .pipe(share())
                    .subscribe( (readCfg: RuntimeConfiguration) => {
                        try {
                            this.currentConfiguration = readCfg;
                            console.log(readCfg);
                            resolve(this.currentConfiguration);
                        } catch (error) {
                            console.error('Fail to parse yadomsconfig.json : ' + error, error);
                            this.currentConfiguration = this.defaultConfiguration;
                            resolve(this.currentConfiguration);
                        }
                    }, (ex) => {
                        console.error('Fail to get yadomsconfig.json : ' + ex, ex);
                        this.currentConfiguration = this.defaultConfiguration;
                        resolve(this.currentConfiguration);
                    });
            } else {
                resolve(this.currentConfiguration);
            }
        });
    }

    /**
     * Get the configuration values from 'yadomsconfig.json'
     */
    public get(): RuntimeConfiguration {
        return this.currentConfiguration;
    }
}
