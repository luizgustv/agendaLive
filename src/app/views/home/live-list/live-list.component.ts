import { Component, OnInit } from '@angular/core';
import { LiveService } from '../../../shared/service/live.service';
import { Live} from '../../../shared/model/live.model';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css']
})
export class LiveListComponent implements OnInit {

  livesPrevious: Live[];
  livesNext: Live[];
  next : boolean = false;
  previous : boolean; 

  constructor(public liveService: LiveService, public sanitizer: DomSanitizer) { }

  //nesse metodo tera os outros metodos q serao inicializados quando o componente live-list for inicializado
  ngOnInit(): void {
    this.getLives();
  }

  getLives(){
    //ao ter a requisicao feita, subscribe ira definir oq ira ser feito com esses dados
    this.liveService.getLivesWithFlag('previous').subscribe(data => {
      //content é um elemento array de ResponsePageable q ira conter as lives 
      this.livesPrevious = data.content;
      console.log(this.livesPrevious);

      this.livesPrevious.forEach(live => {
        /*com this.sanitizer.bypassSecurityTrustResourceUrl se torna possivel interagir 
        com o link do youtube na aplicacao (ir direto pro youtube, por exemplo)*/
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });
      this.previous = true;

    });


    this.liveService.getLivesWithFlag('next').subscribe(data => {
      //content é um elemento array de ResponsePageable q ira conter as lives 
      this.livesNext = data.content;
      console.log(this.livesNext);
      
      this.livesNext.forEach(live => {
        /*com this.sanitizer.bypassSecurityTrustResourceUrl se torna possivel interagir 
        com o link do youtube na aplicacao (ir direto pro youtube, por exemplo)*/
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });
      this.next = true;

    });

  }

}
