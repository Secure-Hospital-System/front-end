import { Pipe, PipeTransform } from '@angular/core';
import { StateService } from './services/state.service';
@Pipe({ name: 'docname' })

export class DocNamePipe implements PipeTransform {
    constructor(private stateService: StateService){

    }
    transform(doctorId:any): string {
        const doctor = this.stateService.doctors.find((x:any) => x.doctorID == doctorId);
        return doctor ? doctor.name : doctorId ;
    }
  }