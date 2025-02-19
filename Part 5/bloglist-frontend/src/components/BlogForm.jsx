const BlogForm = ({ onSubmit, handleTitleChange, handleAuthorChange, handleUrlChange, newTitle, newAuthor, newUrl}) => {
    
    return (
        <div>
            <h2>Create a new Blog</h2>
            <form onSubmit={onSubmit}>
                Title:
                <input value={newTitle} onChange={handleTitleChange} /> <br />
                Author:
                <input value={newAuthor} onChange={handleAuthorChange} /> <br />
                Url:
                <input value={newUrl} onChange={handleUrlChange} /> <br />
                <button type="submit">save</button>
            </form>
        </div>
)};

export default BlogForm