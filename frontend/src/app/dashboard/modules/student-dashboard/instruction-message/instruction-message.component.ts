import { Component, OnInit, Input } from '@angular/core';
import { InstructionService } from '../../instructions/instructions.service';

@Component({
  selector: 'app-instruction-message',
  templateUrl: './instruction-message.component.html',
  styleUrls: ['./instruction-message.component.css']
})
export class InstructionMessageComponent implements OnInit {
public check: boolean = false;
public insid : string = window.localStorage['ins'];

public message;
constructor(private instructionService: InstructionService){

}
  checked(){
    this.check = true;
  }
  ngOnInit(): void {
    window.localStorage.removeItem('ins');
    this.instructionService.getInstruction(`${this.insid}`).subscribe((res)=>{
      this.message= res.message;
    })
  }

}
