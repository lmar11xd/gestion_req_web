import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Requerimiento } from 'src/app/interfaces/requerimiento';
import { RequerimientoService } from 'src/app/services/requerimiento.service';

@Component({
  selector: 'app-requerimiento',
  templateUrl: './requerimiento.component.html',
  styleUrls: ['./requerimiento.component.scss']
})
export class RequerimientoComponent implements OnInit {
  allRequeriments: Requerimiento[] = [];

  constructor(private _reqService: RequerimientoService, private _router: Router) {}

  ngOnInit(): void {
    this.showList();
  }

  showList() {
    this._reqService.getList().subscribe({
      next: (response) => {
        if(response.status == 200) {
          this.allRequeriments = response.data
        }
      },
      error: (e) => console.log(e)
    })
  }

  goToAddReq(id:number) {
    if(id==0) {
      this._router.navigate(['/pages/add-edit']);
    } else {
      this._router.navigate(['/pages/add-edit', id]);
    }
  }

  deleteReq(id:number) {
    this._reqService.delete(id).subscribe({
      next: (response) => {
        if(response.status == 200) {
          this.showList();
          alert("Requerimiento eliminado");
        } else {
          alert("Error: " + response.message);
        }
      },
      error: (e) => console.log(e)
    });
  }
}
