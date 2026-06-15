export function parseCommand(text){

    const lower =
        text.toLowerCase();


    if(
        lower.includes("메모장")
    ){

        return {

            action:"open_notepad"

        };

    }


    if(
        lower.includes("파일")
        ||
        lower.includes("탐색기")
        ||
        lower.includes("explorer")
    ){

        return {

            action:"open_explorer"

        };

    }


    // 폴더 생성
    if(
        lower.includes("폴더")
        &&
        (
            lower.includes("만들")
            ||
            lower.includes("생성")
        )
    ){

        const words =
            text.split(" ");


        const folderName =
            words[0];


        return {

            action:"create_folder",

            name:folderName

        };

    }

    if(
    lower.includes("내 파일")
    ||
    lower.includes("파일 목록")
){
    return {
        action:"list_files"
    };
}


if(
    lower.includes("운영체제 기능")
    ||
    lower.includes("os 기능")
){
    return {
        action:"show_os_features"
    };
}


if(
    lower.includes("터미널 명령어")
){
    return {
        action:"show_terminal_commands"
    };
}


    return null;

}
