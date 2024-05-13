import { AfterViewInit, Component, OnInit } from "@angular/core";
import { FormServiceService } from "../form-service.service";
import { IFormStructureInterface } from "../IFormStructureInterface";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-dynamic-form-component",
  templateUrl: "./dynamic-form-component.component.html",
  styleUrls: ["./dynamic-form-component.component.sass"],
})
export class DynamicFormComponentComponent implements AfterViewInit {
  onFormSubmission() {
    console.log(this.dynamicFormGroup.value);
  }
  constructor(private formService: FormServiceService, private fb: FormBuilder) {
    this.formService
      .getFormStructure()
      .subscribe((formContent: IFormStructureInterface[]) => {
        console.log(formContent);
        this.formContent = formContent;
        this.intializeFormGroup(formContent);
        this.formTest = this.fb.group({
          company: this.fb.group({
            companyName: ["", Validators.required],
            companyLocation:""
          }),
          employee: this.fb.array([
            {
              firstName: ['', Validators.required],
              lastName: ['', Validators.minLength(4)]
            }
          ])
        });
      });
  }
  formContent: IFormStructureInterface[];
  dynamicFormGroup: FormGroup;
  formTest: FormGroup;
  formGroupMap = {};
  formControlValidators;
  ngAfterViewInit(): void {}
  intializeFormGroup(formContent: IFormStructureInterface[]) {
    formContent.forEach((formTypeControl: IFormStructureInterface) => {
      if (!["formGroup", "formArray"].includes(formTypeControl.type)) {
        if (formTypeControl?.validations.length > 0) {
          this.formControlValidators = formTypeControl.validations.reduce(
            (acc, currentvalue) => {
              if (currentvalue.name === "required") {
                acc.push(Validators.required);
              }
              return acc;
            },
            []
          );
        }
        this.formGroupMap[formTypeControl.name] = new FormControl(
          formTypeControl.value || "",
          this.formControlValidators
        );
      } else if (formTypeControl.type == "formGroup") {
        this.formGroupMap[formTypeControl.name] = new FormGroup(
          (formTypeControl.value as IFormStructureInterface[]).reduce(
            (acc, v) => {
              acc[v.name] = new FormControl(
                v.value || "",
                v.validations.reduce((accumulator, validation) => {
                  if (validation.name === "required") {
                    accumulator.push(Validators.required);
                  }
                  return accumulator;
                }, [])
              );
              return acc;
            },
            {}
          )
        );
      } else {
        this.formGroupMap[formTypeControl.name] = new FormArray([
          new FormGroup({
            primarySkill: new FormControl("123"),
            secondarySkill: new FormControl("asqw"),
          }),
        ]);
        /*
        new FormGroup(
            (formTypeControl.value as IFormStructureInterface[]).reduce(
              (a, v) => {
                a[v.name] = new FormControl(
                  v.value,
                  v.validations.reduce((accumulator, validation) => {
                    if (validation.name === "required") {
                      accumulator.push(Validators.required);
                    }
                    return accumulator;
                  }, [])
                );
                return a;
              },
              {}
            )
          ),
        */
      }
    });
    this.dynamicFormGroup = new FormGroup(this.formGroupMap);
    console.log("Dynamic Form");
    console.log(this.dynamicFormGroup);
    this.dynamicFormGroup.valueChanges.subscribe((v) => {
      console.log("Value Changes");
      console.log(v);
    });
    this.dynamicFormGroup.statusChanges.subscribe((v) => {
      console.log("Status Changes");
      console.log(v);
    });
  }
  addMoreSkills() {
    (this.dynamicFormGroup.controls["skills"] as FormArray).push(
      new FormGroup({
        primarySkill: new FormControl("", Validators.required),
        secondarySkill: new FormControl("", Validators.required),
      })
    );
  }
  get skills() {
    return this.dynamicFormGroup.get('skills') as FormArray;
  }

}
