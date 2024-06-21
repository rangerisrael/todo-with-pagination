import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { useContext } from 'react';

import RenderIf from '../../components/render-if';
import Modal from '../../components/modal';
import * as yup from 'yup'
import { isEmpty } from 'lodash';
import {v4 as uuidV4} from 'uuid'
import { UserContext } from '../../utils/providers/userProvider';


const InputField = ({ identity, label,...props }) => {
	return (
		<div>
			<div className='flex gap-1 my-4'>
				<label className='w-4/12 font-semibold' htmlFor={identity}>{label}</label>
				<Field name={identity} id={identity} className='border border-1 border-gray-300 rounded-md h-[34px] w-full' {...props}/>
			</div>
      <div>
        <ErrorMessage name={identity} component={'div'}/>
      </div>
		</div>
	);
};

const FormField = () => {

  const { modal,setModal, updateUser, createUser } = useContext(UserContext);


const formSchema = yup.object().shape({
  uuid:yup.string(),
	fullName: yup.string().required('Field cannot empty.'),
	email: yup.string().required('Field cannot empty.').email('Email is invalid'),
	address: yup.string().required('Field cannot empty.'),
	profile: yup.string().required('Field cannot empty.'),
});

const initialValue = {
	uuid: modal?.user?.uuid ?? uuidV4(),
	fullName: modal?.user?.fullName ?? '',
	email: modal?.user?.email ?? '',
	address: modal.user?.address ?? '',
	profile: modal?.user?.profile ?? '',
};


  return (
		<div className='w-full'>
			<div className='flex justify-end my-5'>
				<button onClick={() => setModal({ toggle: true })} className='btn bg-indigo-700 text-white rounded-full px-4 py-2 font-semibold'>
					+
				</button>
			</div>

			<RenderIf value={modal.toggle}>
				<Modal>
					<Formik
						initialValues={initialValue}
						validationSchema={formSchema}
						onSubmit={(values, action) => {
							if (modal.action == 'edit') {
								updateUser(modal.user.uuid, values);
							} else {
								createUser(values);
							}
							action.resetForm();
							setModal({ toggle: false });
						}}
						enableReinitialize
					>
						<Form>
							<p>Add user {!isEmpty(modal.user && <span>({modal.user.uuid})</span>)}</p>

							<InputField identity={'fullName'} label='Name' />
							<InputField identity={'email'} label='Email' type='email' />
							<InputField identity={'address'} label='Address' />
							<InputField identity={'profile'} label='Profile url' />

							<div className='flex justify-end'>
								<button type='submit' className='btn bg-green-600 rounded-md px-5 py-1 font-semibold text-white'>
									{modal.action == 'edit' ? 'Update' : 'Save'}
								</button>
							</div>
						</Form>
					</Formik>
				</Modal>
			</RenderIf>
		</div>
	);
}

export default FormField
