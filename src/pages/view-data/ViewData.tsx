import { useEffect, useState } from 'react';
import './ViewData.scss'
import { Link, useNavigate, useParams } from 'react-router-dom';
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
export default function ViewData() {
    const { index } : any = useParams<{ index: string }>();
    const [form, setForm] = useState<Form | any>(null);
    const navigate = useNavigate()

   
    useEffect(() => {
        const savedForms = localStorage.getItem('forms');
        if (savedForms) {
          const forms: Form[] = JSON.parse(savedForms);
          const formIndex = parseInt(index);
          if (formIndex >= 0 && formIndex < forms.length) {
            setForm(forms[formIndex]);
            console.log(form)
          } else {
           
            navigate('/404')
          }
        }
    }, [index]);
  return (
    <div className="container-fluid">
      <div className="nav">
        <h2>{form?.formName}</h2>
        <div className="add-form-btn">
          <Link to={'/'} className='btn btn-secondary'>Back</Link>
        </div>
      </div>
      <div className="table-wrapper-2">
        <table>
          <thead>
            <tr>
            {
                   
                   form && form.fields.map((field: Field, index: number) => {
                     if (field.type === 'short-question') {
                       return (
                         <th className='w-20' key={index}>{field.shortQuestion}</th>
                       );
                     } else if (field.type === 'multiple-choice') {
                       return (
                        <th key={index}>{field.multiChoiceData?.question}</th>
                       );
                     } else{
                       return (
                        <th key={index}>{field.checkboxData?.question}</th>
                       );
                     }
                   
                   })
                 }
            </tr>
          </thead>
          <tbody>
         
            {form?.data.map((d: any, rowIndex: number) => (
                < tr key={rowIndex}>
                    {Object.keys(d).map((key: any, colIndex: number) => (
                        <td key={colIndex}>{d[key]}</td>
                    ))}
                </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  )
}
