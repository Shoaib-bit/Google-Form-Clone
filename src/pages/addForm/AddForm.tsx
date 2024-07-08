import { Link, useNavigate } from 'react-router-dom';
import './AddForm.scss';
import { useState } from 'react';

export default function AddForm() {
  const [formName, setFormName] = useState('Untitled Form');
  const [fields, setFields] = useState<any[]>([]);
  const [activeFieldIndex, setActiveFieldIndex] = useState(-1);
  const navigate = useNavigate()
  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormName(event.target.value);
  };

  const addFields = () => {
    const initialField = {
      type: 'multiple-choice',
      multiChoiceData: {
        question: '',
        options: ['Option 1']
      },
      checkboxData: {
        question: '',
        options: ['Option 1']
      },
      shortQuestion: '',
      required: false  // Added required field
    };
    setFields(prevFields => [...prevFields, initialField]);
    setActiveFieldIndex(fields.length); // Corrected setActiveFieldIndex
  };

  const handleFieldTypeChange = (index: number, newType: string) => {
    setFields(prevFields =>
      prevFields.map((field, i) =>
        i === index ? { ...field, type: newType } : field
      )
    );
  };

  const handleShortQuestionChange = (index: number, newQuestion: string) => {
    setFields(prevFields =>
      prevFields.map((field, i) =>
        i === index ? { ...field, shortQuestion: newQuestion } : field
      )
    );
  };

  const handleQuestionChange = (index: number, newQuestion: string) => {
    setFields(prevFields =>
      prevFields.map((field, i) =>
        i === index
          ? { ...field, multiChoiceData: { ...field.multiChoiceData, question: newQuestion } }
          : field
      )
    );
  };

  const handleOptionChange = (fieldIndex: number, optionIndex: number, newOption: string) => {
    setFields(prevFields =>
      prevFields.map((field, i) =>
        i === fieldIndex
          ? {
              ...field,
              multiChoiceData: {
                ...field.multiChoiceData,
                options: field.multiChoiceData.options.map((option: string, j: number) =>
                  j === optionIndex ? newOption : option
                )
              }
            }
          : field
      )
    );
  };

  const addOption = (index: number) => {
    setFields(prevFields =>
      prevFields.map((field, i) =>
        i === index
          ? {
              ...field,
              multiChoiceData: {
                ...field.multiChoiceData,
                options: [...field.multiChoiceData.options, `Option ${field.multiChoiceData.options.length + 1}`]
              }
            }
          : field
      )
    );
  };

  const removeOption = (fieldIndex: number, optionIndex: number) => {
    setFields(prevFields =>
      prevFields.map((field, i) =>
        i === fieldIndex
          ? {
              ...field,
              multiChoiceData: {
                ...field.multiChoiceData,
                options: field.multiChoiceData.options.filter((_ : any, j : any) => j !== optionIndex)
              }
            }
          : field
      )
    );
  };
 
  const handleCheckboxQuestionChange = (index: number, newQuestion: string) => {
    setFields(prevFields =>
      prevFields.map((field, i) =>
        i === index ? { ...field, checkboxData: { ...field.checkboxData, question: newQuestion } } : field
      )
    );
  };

  const handleCheckboxOptionChange = (fieldIndex: number, optionIndex: number, newOption: string) => {
    setFields(prevFields =>
      prevFields.map((field, i) =>
        i === fieldIndex
          ? {
              ...field,
              checkboxData: {
                ...field.checkboxData,
                options: field.checkboxData.options.map((option: string, j: number) =>
                  j === optionIndex ? newOption : option
                )
              }
            }
          : field
      )
    );
  };

  const addCheckboxOption = (index: number) => {
    setFields(prevFields =>
      prevFields.map((field, i) =>
        i === index
          ? {
              ...field,
              checkboxData: {
                ...field.checkboxData,
                options: [...field.checkboxData.options, `Option ${field.checkboxData.options.length + 1}`]
              }
            }
          : field
      )
    );
  };

  const removeCheckboxOption = (fieldIndex: number, optionIndex: number) => {
    setFields(prevFields =>
      prevFields.map((field, i) =>
        i === fieldIndex
          ? {
              ...field,
              checkboxData: {
                ...field.checkboxData,
                options: field.checkboxData.options.filter((_ : any, j : any) => j !== optionIndex)
              }
            }
          : field
      )
    );
  };

  const toggleRequired = (index: number) => {
    setFields(prevFields =>
      prevFields.map((field, i) =>
        i === index ? { ...field, required: !field.required } : field
      )
    );
  };

  const submitData = () => {
    const data = {
      formName: formName,
      fields: fields,
      data : []
    };
    const savedFormsString = localStorage.getItem('forms');
    const savedForms = savedFormsString ? JSON.parse(savedFormsString) : [];
    savedForms.push(data);
    localStorage.setItem('forms', JSON.stringify(savedForms));
  
    console.log('Form Data', data);
    navigate('/')
  };
  

  return (
    <div className='container'>
      <div className="nav">
        <Link to={'/'} className='btn btn-secondary'>Back</Link>
        <a className='btn btn-primary' onClick={submitData}>Save</a>
      </div>
      <div className="add-form-wrapper">
        <div className="add-form">
          <div className="form-name">
            <input
              type="text"
              placeholder='Enter Form Name'
              onChange={handleName}
              value={formName}
            />
          </div>
          {fields.map((field, index) => (
            <div className="field" key={index} onClick={() => setActiveFieldIndex(index)}>
              {activeFieldIndex === index && (
                <div className="customization">
                  <div
                    className="cross"
                    onClick={(e) => {
                      e.stopPropagation();
                      const otherFields = fields.filter((_, i) => i !== index);
                      setFields(otherFields);
                      setActiveFieldIndex(-1);
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.9848 20.7661L1.21875 1"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20.7661 1.23389L1 21"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="drop-down">
                    <select
                      className="form-select"
                      value={field.type}
                      onChange={(e) => handleFieldTypeChange(index, e.target.value)}
                    >
                      <option value="multiple-choice">Multiple Choice</option>
                      <option value="short-question">Short Question</option>
                      <option value="checkbox">Checkbox</option>
                    </select>
                  </div>
                  {field.type === 'multiple-choice' && (
                    <div className="multiple-choice">
                      <div className="question">
                        <input
                          type="text"
                          placeholder='Enter Question'
                          value={field.multiChoiceData.question}
                          onChange={(e) => handleQuestionChange(index, e.target.value)}
                        />
                      </div>
                      <ul>
                        {field.multiChoiceData.options.map((option: string, optionIndex: number) => (
                          <li key={optionIndex}>
                            <input
                              type="text"
                              placeholder={`Option ${optionIndex + 1}`}
                              value={option}
                              onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                            />
                            {field.multiChoiceData.options.length > 1 && (
                              <div
                                className="cross-icon"
                                onClick={() => removeOption(index, optionIndex)}
                              >
                                <svg
                                  width="22"
                                  height="22"
                                  viewBox="0 0 22 22"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20.9848 20.7661L1.21875 1"
                                    stroke="#292D32"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M20.7661 1.23389L1 21"
                                    stroke="#292D32"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            )}
                          </li>
                        ))}
                        <li className='add-link'>
                          <a onClick={() => addOption(index)}>Add Option</a>
                        </li>
                      </ul>
                    </div>
                  )}
                  {field.type === 'short-question' && (
                    <div className="short-question">
                      <input
                        type="text"
                        placeholder='Question'
                        value={field.shortQuestion}
                        onChange={(e) => handleShortQuestionChange(index, e.target.value)}
                      />
                    </div>
                  )}
                  {field.type === 'checkbox' && (
                    <div className="checkbox">
                      <div className="question">
                        <input
                          type="text"
                          placeholder='Enter Question'
                          value={field.checkboxData.question}
                          onChange={(e) => handleCheckboxQuestionChange(index, e.target.value)}
                        />
                      </div>
                      <ul>
                        {field.checkboxData.options.map((option: string, optionIndex: number) => (
                          <li key={optionIndex}>
                            <input
                              type="text"
                              placeholder={`Option ${optionIndex + 1}`}
                              value={option}
                              onChange={(e) => handleCheckboxOptionChange(index, optionIndex, e.target.value)}
                            />
                            {field.checkboxData.options.length > 1 && (
                              <div
                                className="cross-icon"
                                onClick={() => removeCheckboxOption(index, optionIndex)}
                              >
                                <svg
                                  width="22"
                                  height="22"
                                  viewBox="0 0 22 22"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20.9848 20.7661L1.21875 1"
                                    stroke="#292D32"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M20.7661 1.23389L1 21"
                                    stroke="#292D32"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            )}
                          </li>
                        ))}
                        <li className='add-link'>
                          <a onClick={() => addCheckboxOption(index)}>Add Option</a>
                        </li>
                      </ul>
                    </div>
                  )}
                  <div className="required-toggle">
                    Required:
                      <label className="toggle-label">
                        
                        <input
                          type="checkbox"
                          className="toggle-input"
                          checked={field.required}
                          onChange={() => toggleRequired(index)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                </div>
              )}
              {activeFieldIndex !== index && (
                <div className="view">
                  {field.type === 'multiple-choice' && (
                    <div className="multiple-choice-view">
                      {(field.multiChoiceData.question === '') ? 'Question' : field.multiChoiceData.question}{field.required && <span className='required'>*</span>}

                      <ul>
                        {field.multiChoiceData.options.map((option: string, optionIndex: number) => (
                          <li key={optionIndex}>{option}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {field.type === 'short-question' && (
                    <div className="short-question-view">
                      {(field.shortQuestion === '') ? 'Question' : field.shortQuestion}{field.required && <span className='required'>*</span>}
                    </div>
                  )}
                  {field.type === 'checkbox' && (
                    <div className="checkbox-view">
                      {(field.checkboxData.question === '') ? 'Question' : field.checkboxData.question}{field.required && <span className='required'>*</span>}
                      <ul style={{ listStyleType: 'square' }}>
                        {field.checkboxData.options.map((option: string, optionIndex: number) => (
                          <li key={optionIndex}>{option}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          <div className="add-wrapper">
            <div className="add" onClick={addFields}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 11H1"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.9883 1V21"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
