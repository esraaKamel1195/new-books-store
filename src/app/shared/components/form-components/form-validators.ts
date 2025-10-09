export const formConfig = [
  {
    type: 'input',
    label: 'Email',
    name: 'email',
    validators: ['required', 'email'],
  },
  {
    type: 'password',
    label: 'Password',
    name: 'password',
    validators: ['required'],
  },
];
