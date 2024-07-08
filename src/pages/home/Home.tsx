import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

export default function Home() {
  const [forms, setForms] = useState<any>([]);

  useEffect(() => {
    const savedFormsString = localStorage.getItem('forms');
    const savedForms = savedFormsString ? JSON.parse(savedFormsString) : [];
    setForms(savedForms);
  }, []);

  return (
    <div className="container-fluid">
      <div className="nav">
        <h2>Form Control</h2>
        <div className="add-form-btn">
          <Link to={'add-form'} className='btn btn-primary'>Add Form</Link>
        </div>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th className='heading'>Form Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form : any, index : number) => (
              <tr key={index}>
                <td>{form.formName}</td>
                <td className='actions'>
                  <Link to={`/preview/${index}`} className='btn btn-primary'>Preview</Link>
                  <Link to={`/view-data/${index}`} className='btn btn-success'>View Data</Link>
                  <button className='btn btn-danger' onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}{
              forms.length == 0 && 
              <p>Data Not Found!!</p>
            }
          </tbody>
        </table>
      </div>
    </div>
  );

  function handleDelete(index : number) {
    const updatedForms = [...forms];
    updatedForms.splice(index, 1);
    setForms(updatedForms);
    localStorage.setItem('forms', JSON.stringify(updatedForms));
  }
}
