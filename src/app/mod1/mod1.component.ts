import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mod1',
  templateUrl: './mod1.component.html',
  styleUrls: ['./mod1.component.css'],
})
export class Mod1Component implements OnInit {
  form1 = { name: '', description: '' };

  name: string = '';
  description: string = '';

  reactiveForm1 = new FormGroup({
    name: new FormControl(),
    description: new FormControl(''),
  });

  formBuilder1: FormGroup;

  constructor(fb: FormBuilder) {
    this.formBuilder1 = fb.group({
      name: [null, Validators.required],
      description: fb.control('', Validators.required),
      title: [{value:null, disabled:true}, Validators.required],

      phones: fb.array([['+79081234567'], ['+79089876543'], ['+79084539812']]),
      age: fb.control(null, [ Validators.min(10), Validators.max(100)])
    });
//Подписка
    this.formBuilder1.get('name').valueChanges.subscribe(value=>{
      if(value === 'Привет'){
        this.formBuilder1.get('description').setValue('Приветствие');
      }
    })
  }

  get getPhones(): FormArray {
    return this.formBuilder1.get("phones") as FormArray;
  }

  get getAge(): FormControl {
    return this.formBuilder1.get("age") as FormControl
  }

  toggle(){
      if(this.formBuilder1.get('title').disabled){
        this.formBuilder1.get('title').enable();
      
      } else {
        this.formBuilder1.get('title').disable();
      }
  }

  refresh(){
    this.formBuilder1.reset();
  }

  ngOnInit(): void {}
}
