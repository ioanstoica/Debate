import { Component } from '@angular/core';
import { Config, ConfigService } from './config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  providers: [ConfigService],
  styleUrls: ['./config.component.css']
})

export class ConfigComponent {
  error: any;
  headers: string[] = [];
  config: Config | undefined;

  clear() {
    this.config = undefined;
    this.error = undefined;
    this.headers = [];
  }

  constructor(private configService: ConfigService) { }

  showConfig() {
    this.configService.getConfig()
      .subscribe((data: Config) => this.config = {
        heroesUrl: data.heroesUrl,
        textfile: data.textfile,
        date: data.date,
      });
  }


}
