import { Field, Form, Formik } from "formik";
// import * as Yup from "yup";
import toast, { Toaster } from 'react-hot-toast';
import css from "./SearchBar.module.css";

// const validationSchema = Yup.object().shape({
//     topic: Yup.string()
//         .min(3, "Minimum 3 letters")
//         .required("This field is required"),
// });

export default function SearchBar({ onSearch }) {
    return (
        <div className={css.container}>
            <Formik className={css.formik}
                initialValues={{ topic: "" }}
                // validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    const trimmedTopic = values.topic.trim();
                    if (trimmedTopic === "") {
                        toast.error("Can not be empty");
                    } else if (trimmedTopic.length < 3) {
                        toast.error("Minimum 3 letters");
                    } else {
                        onSearch(trimmedTopic);
                        actions.resetForm();
                    }
                }}
            >
                {({ errors, touched }) => (
                    <Form className={css.form} >
                        <Field className={css.field}
                            type="text" 
                            name="topic" 
                            placeholder="Search images and photos" 
                        />
                        <button  type="submit" className={css.button}>Search</button>
                        {errors.topic && touched.topic ? (
                            <div >{errors.topic}</div>
                        ) : null}
                    </Form>
                )}
            </Formik>
            <Toaster />
        </div>
    );
}