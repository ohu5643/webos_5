import { speak } from "../services/TTSService.js";
import { parseCommand } from "../services/CommandParser.js";

export default class AIAssistant {

    constructor(
        wm,
        explorer,
        notepad,
        fs,
        auth
    ){

        this.wm = wm;
        this.explorer = explorer;
        this.notepad = notepad;
        this.fs = fs;
        this.auth = auth;
    }

    open(){

        const aiWin =
            this.wm.createWindow(

                "AI Assistant",

                `

                <div
                    id="chat"

                    style="
                        height:300px;
                        overflow:auto;
                        border:1px solid #555;
                        margin-bottom:10px;
                        padding:5px;
                    "

                ></div>

                <textarea
                    id="prompt"

                    style="
                        width:100%;
                        height:80px;
                    "

                ></textarea>

                <button id="send-ai">

                    전송

                </button>

                `
            );


        const sendBtn =
            aiWin.querySelector(
                "#send-ai"
            );


        sendBtn.addEventListener(

            "click",

            async ()=>{

                const prompt =
                    aiWin
                    .querySelector(
                        "#prompt"
                    )
                    .value;


                const chat =
                    aiWin
                    .querySelector(
                        "#chat"
                    );


                chat.innerHTML += `

                    <div>

                        <b>나:</b>
                        ${prompt}

                    </div>

                `;


                // ---------- 명령어 확인 ----------
                const command =
                    parseCommand(
                        prompt
                    );


                if(command){

                    if(
                        command.action ===
                        "open_notepad"
                    ){

                        this.notepad.open();

                        chat.innerHTML += `

                            <div>

                                <b>AI:</b>
                                메모장을 실행했어요.

                            </div>

                        `;

                        speak(
                            "메모장을 실행했어요"
                        );

                        return;

                    }


                    if(
                        command.action ===
                        "open_explorer"
                    ){

                        this.explorer.open();

                        chat.innerHTML += `

                            <div>

                                <b>AI:</b>
                                파일 탐색기를 열었어요.

                            </div>

                        `;

                        speak(
                            "파일 탐색기를 열었어요"
                        );

                        return;

                    }

                    if(
                        command.action ===
                        "create_folder"
                    ){

                        const user =
                            this.auth.currentUser;


                        await this.fs.createFolder(

                            user.uid,

                            command.name

                        );


                        chat.innerHTML += `

                            <div>

                                <b>AI:</b>
                                ${command.name}
                                폴더를 만들었어요.

                            </div>

                        `;


                        speak(
                            "폴더 생성 완료"
                        );

                        return;

                    }

                }


                // ---------- Gemini API ----------
                const response =
                    await fetch(

                        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyCr4sNcHYkF7Zbud2y-ey3ZXqwLTrMknUE",

                        {

                            method:"POST",

                            headers:{

                                "Content-Type":
                                "application/json"

                            },

                            body:JSON.stringify({

                                contents:[

                                    {

                                        parts:[

                                            {

                                                text:prompt

                                            }

                                        ]

                                    }

                                ]

                            })

                        }
                    );


                const data =
                    await response.json();


                const answer =
                    data
                    .candidates[0]
                    .content
                    .parts[0]
                    .text;


                chat.innerHTML += `

                    <div>

                        <b>AI:</b>
                        ${answer}

                    </div>

                `;


                speak(answer);

            }

        );

    }

}