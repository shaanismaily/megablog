import { useEffect, useState } from "react";
import appwriteService from "../../appwrite/config";
import { useNavigate, useParams } from "react-router";


function EditPost() {
    const [post, setPost] = useState(null)
    const navigate = useNavigate()
    const {slug} = useParams()

    useEffect(() => {
        appwriteService.getPost(slug).then(post => {
            if (post) {
                setPost(post)
            } else {
                navigate("/")
            }
        }).catch(() => {
            console.log("Unable to load Post", error)
        })
    }, [slug, navigate])

    return post ? (
            <div className="py-8">
        <Container>
                <PostForm post={post} />
        </Container>
            </div>
    ) : null
}
export default EditPost;