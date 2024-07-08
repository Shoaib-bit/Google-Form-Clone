import { SubmitHandler, useForm } from 'react-hook-form';
import './Preview.scss'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


type MultiChoiceData = {
    question: string;
    options: string[];
  };
  
  type CheckboxData = {
    question: string;
    options: string[];
  };
type Field = {
    type: 'multiple-choice' | 'short-question' | 'checkbox';
    multiChoiceData?: MultiChoiceData;
    checkboxData?: CheckboxData;
    shortQuestion?: string;
    required: boolean;
  };
type Form = {
    formName: string;
    fields: Field[];
    data : any[]
  };
export default function Preview() {
    const { register, handleSubmit, formState: { errors } } = useForm<any>();
    const { index } : any = useParams<{ index: string }>();
    const [form, setForm] = useState<Form | any>(null);
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
        const savedForms = localStorage.getItem('forms');
        if (savedForms) {
          const forms: Form[] = JSON.parse(savedForms);
          const formIndex = parseInt(index);
          if (formIndex >= 0 && formIndex < forms.length) {
            forms[formIndex].data.push(data)
            localStorage.setItem('forms', JSON.stringify(forms));
          }
        }
        navigate('/')
    }
    useEffect(() => {
        const savedForms = localStorage.getItem('forms');
        if (savedForms) {
          const forms: Form[] = JSON.parse(savedForms);
          const formIndex = parseInt(index);
          if (formIndex >= 0 && formIndex < forms.length) {
            setForm(forms[formIndex]);
          } else {
           
            navigate('/404')
          }
        }
    }, [index]);
    return (
        <div className="container-fluid-login">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="heading">{form?.formName}</h2>
                {
                   
                    form && form.fields.map((field: Field, index: number) => {
                      if (field.type === 'short-question') {
                        return (
                          <div className="input-group" key={index}>
                            <label>{field.shortQuestion} {field.required && <span>*</span>}</label>
                            <input 
                              type="text" 
                              placeholder={field.shortQuestion}  
                              {...register(index.toString(), {
                                required: field.required
                              })}
                            />
                            {errors[index.toString()] && (
                              <div className="errors">
                                <p>${field.shortQuestion} is required</p>
                              </div>
                            )}
                          </div>
                        );
                      } else if (field.type === 'multiple-choice') {
                        return (
                          <div className="input-group" key={index}>
                            <label className='w-100'>{field.multiChoiceData?.question} {field.required && <span>*</span>}</label>
                            <div className='options'>
                            {field.multiChoiceData?.options.map((option: string, optionIndex: number) => (
                                <div className="form-check-div d-flex" key={optionIndex}>
                                    <input 
                                        className="check-input" 
                                        type="radio" 
                                        id={`option-${index}-${optionIndex}`} 
                                        value={option} 
                                        {...register(index.toString(), {
                                        required: field.required
                                        })}
                                    />
                                    <label className="" htmlFor={`option-${index}-${optionIndex}`}>
                                        {option}
                                    </label>
                                </div>
                            ))}
                            </div>
                            
                            {errors[index.toString()] && (
                              <div className="errors">
                                <p>${field.multiChoiceData?.question} is required</p>
                              </div>
                            )}
                          </div>
                        );
                      } else{
                        return (
                          <div className="input-group" key={index}>
                            <label className='w-100'>{field.checkboxData?.question} {field.required && <span>*</span>}</label>
                            <div className='options'>
                            {field.checkboxData?.options.map((option: string, optionIndex: number) => (
                                <div className="form-check-div d-flex" key={optionIndex}>
                                    <input 
                                        className="check-input" 
                                        type="checkbox" 
                                        id={`option-${index}-${optionIndex}`} 
                                        value={option} 
                                        {...register(index.toString(), {
                                        required: field.required
                                        })}
                                    />
                                    <label className="" htmlFor={`option-${index}-${optionIndex}`}>
                                        {option}
                                    </label>
                                </div>
                            ))}
                            </div>
                            
                            {errors[index.toString()] && (
                              <div className="errors">
                                <p>${field.checkboxData?.question} is required</p>
                              </div>
                            )}
                          </div>
                        );
                      }
                    
                    })
                  }

                
                <button className='btn main-btn'>Submit</button>
            </form>
        </div>
    )
}
