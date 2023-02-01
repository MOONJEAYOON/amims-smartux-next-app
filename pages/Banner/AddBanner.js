import {useCallback, useState} from "react";
import Button from '@mui/material/Button';

const AddBanner = () => {

    // 게시판 제목, 내용, 사진
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState({
        image_file: "",
        preview_URL: "image/default_image.png",
    });
    const canSubmit = useCallback(() => {
        return image.image_file !== "" && content !== "" && title !== "";
    }, [image, title, content]);

    const handleSubmit = useCallback(async () => {
        try{
            const formData = new FormData();
            formData.append("fileData", image.image_file);

            await api.post("/api/fileData", formData);

            await api.post("/api/boards/write", {
                "title": title,
                "content": content,
                "file": image.image_file.name
            });
            window.alert("😎등록이 완료되었습니다😎");
            navigate("/board-list");
        } catch (e) {
            // 서버에서 받은 에러 메시지 출력
            toast.error("오류발생! 이모지를 사용하면 오류가 발생할 수 있습니다" + "😭", {
                position: "top-center",
            });
        }

    }, [canSubmit]);

    return (
        <div className="addBoard-wrapper">
            <div className="addBoard-header">
                게시물 등록하기 🖊️
            </div>
            <div className="submitButton">
                {canSubmit() ? (
                    <Button
                        onClick={handleSubmit}
                        className="success-button"
                        variant="outlined"
                    >
                        등록하기😃
                    </Button>
                ) : (
                    <Button
                        className="disable-button"
                        variant="outlined"
                        size="large"
                    >
                        사진과 내용을 모두 입력하세요😭
                    </Button>
                )}
            </div>
            <div className="addBoard-body">

            </div>
        </div>
    );
}

export default AddBanner;