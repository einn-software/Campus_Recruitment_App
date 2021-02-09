import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instruction-message',
  templateUrl: './instruction-message.component.html',
  styleUrls: ['./instruction-message.component.css']
})
export class InstructionMessageComponent implements OnInit {
public check: boolean = false;
  constructor() { }
  checked(){
    this.check = true;
  }
  ngOnInit(): void {
  }

}
