import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { NumberValidators } from './validators/validators';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "reactive-forms-and-form-arrays";
  myForm: FormGroup;

  get books(): FormArray {
    return this.myForm.get("books") as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.configForm();
  }

  addBook() {
    this.books.push(this.buildBook())
  }

  removeBook(i: number) {
    this.books.removeAt(i);
  }

  save() {
    alert(`New Author created: ${this.myForm.get('author').value}`)
  }

  private configForm() {
    this.myForm = this.fb.group({
      author: ["", [Validators.required, Validators.maxLength(40)]],
      books: this.fb.array([this.buildBook()]),
    });
  }

  private buildBook(): FormGroup {
    return this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(40)]],
      stars: [null, [Validators.required, NumberValidators.range(1, 5)]],
    });
  }
}
