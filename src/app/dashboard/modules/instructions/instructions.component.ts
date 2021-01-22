import { Component, OnInit } from '@angular/core';
import { Instruction } from './instructions.model';
import { InstructionService } from './instructions.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  public instructionList : Instruction[] = [];

  constructor(private instructionService: InstructionService) { }

  ngOnInit(): void {
    this.instructionService.getInstructions().subscribe(
      res => this.instructionList = res
    )
  }

}
