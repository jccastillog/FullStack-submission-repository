import { useState } from "react";

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [newUrl, setNewUrl] = useState("");

    const addBlog = (event) => {
        event.preventDefault();
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
            likes: 0,
        });
        setNewTitle("");
        setNewAuthor("");
        setNewUrl("");
    };

    return (
        <div>
            <h2>Create a new Blog</h2>
            <form onSubmit={addBlog}>
                Title:
                <input value={newTitle} onChange={event => setNewTitle(event.target.value)} /> <br />
                Author:
                <input value={newAuthor} onChange={event => setNewAuthor(event.target.value)} /> <br />
                Url:
                <input value={newUrl} onChange={event => setNewUrl(event.target.value)} /> <br />
                <button type="submit">save</button>
            </form>
        </div>
    );
};

export default BlogForm;
