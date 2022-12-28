import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Requerimiento } from 'src/app/interfaces/requerimiento';
import { RequerimientoService } from 'src/app/services/requerimiento.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  formReq: FormGroup;
  titleAction:string = "Registrar";
  idRequerimiento:number = 0;
  fileDataAnexo!: File;
  fileName: string = "Seleccione...";

  constructor(
    private fb: FormBuilder,
    private _reqService: RequerimientoService,
    private _router: Router,
    private _route: ActivatedRoute){
    this.formReq = fb.group({
      nombre: ["", Validators.required],
      descripcion: ["", Validators.required],
      fileData: [""]
    })
  }

  ngOnInit(): void {
    const paramId = this._route.snapshot.paramMap.get("id")!;
    this.idRequerimiento = parseInt(paramId==null?"0":paramId);
    if(this.idRequerimiento != 0) {
      this.titleAction = "Actualizar";
      this._reqService.getById(this.idRequerimiento).subscribe({
        next: (response) => {
          if(response.status == 200) {
            this.formReq.patchValue({
              nombre: response.data.nombre,
              descripcion: response.data.descripcion,
              rutaAnexo: response.data.rutaAnexo
            });
          }
        }
      });
    }
  }

  async addEditReq(){
    if(this.idRequerimiento == 0) {
      if(this.fileDataAnexo == null) {
        alert("Debe adjuntar un archivo en Anexo");
        return;
      }
      const formData = new FormData();
      formData.append("file", this.fileDataAnexo);
      formData.append("req", "" + JSON.stringify(
        {
          nombre: this.formReq.value.nombre,
          descripcion: this.formReq.value.descripcion,
          estado: 'P'
        }));
      /*formData.append("nombre", this.formReq.value.nombre);
      formData.append("descripcion", this.formReq.value.descripcion);
      formData.append("estado", "P");*/

      this._reqService.add(formData).subscribe({
        next: (response) => {
          if(response.status == 200) {
            alert("Requerimiento registrado");
            this._router.navigate(['pages/requerimiento']);
          } else {
            alert("Error: " + response.message);
          }
        },
        error: (e) => console.log(e)
      })
    } else {
      const entryData: Requerimiento = {
        id: this.idRequerimiento,
        nombre: this.formReq.value.nombre,
        descripcion: this.formReq.value.descripcion,
        rutaAnexo: this.formReq.value.rutaAnexo,
        estado: "P"
      }

      this._reqService.update(this.idRequerimiento, entryData).subscribe({
        next: (response) => {
          if(response.status == 200) {
            alert("Requerimiento actualizado");
            this._router.navigate(['pages/requerimiento']);
          } else {
            alert("Error: " + response.message);
          }
        },
        error: (e) => console.log(e)
      })
    }

  }

  onChangeFile(event:any) {
    this.fileDataAnexo = event.target.files[0];
    if(this.fileDataAnexo == null) {
      this.fileName = "Seleccione...";
    } else {
      this.fileName = this.fileDataAnexo.name;
    }
  }
}
