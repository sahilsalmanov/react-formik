import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react';
import * as Yup from 'yup';


function FormikSample() {

    const addProductValidationSchema = Yup.object().shape({
        name: Yup.string()
        .max(50, 'It can be a maximum of 50 characters')
        .required('Name must required'),
            email: Yup.string()
            .required("Email must filled")
            .matches(/.*@code\.edu\.az$/, 'Email must end with "@code.edu.az"'),
            gender: Yup.string().required('Gender must be selected'),
            password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(
              /^(?=.*[A-Z]).*$/,
              'Password must start with an uppercase letter'
            )
            .required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            gender: 'female',
            password: '',
            confirmPassword: ''
        },
        validationSchema: addProductValidationSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            resetForm({ values: '' });
          },
        });

    return (<>
        <form onSubmit={formik.handleSubmit}>
            <>
            <div>
                    <label htmlFor="name">Name</label> <br />
                    <input id="name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name} />
                    <p style={{color:'red'}}>{formik.errors?.name}</p>
                </div>
                <div>
                    <label htmlFor="email">Email</label> <br />
                    <input id="email" name="email" type="text" onChange={formik.handleChange} value={formik.values.email} />
                    <p style={{color:'red'}}>{formik.errors?.email}</p>
                </div> 
                <div>
          <label htmlFor="contactTitle">Gender</label> <br />
          <div>
            <label>
              <input
                type="radio"
                checked={formik.values.gender === 'female'}
                onChange={formik.handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formik.values.gender === 'male'}
                onChange={formik.handleChange}
              />
              Male
            </label>
          </div>
          <p style={{ color: 'red' }}>{formik.errors?.gender}</p>
                </div>
                <div>
          <label htmlFor="password">Password</label> <br />
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <p style={{ color: 'red' }}>{formik.errors?.password}</p>
                </div>
                <div>
          <label htmlFor="confirmPassword">Confirm Password</label> <br />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="confirmPassword"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          <p style={{ color: 'red' }}>{formik.errors?.confirmPassword}</p>
               </div>
               <div>
          <input type="submit" value="Add" />
               </div>
            </>

        </form>



    </>)
}

export default FormikSample

