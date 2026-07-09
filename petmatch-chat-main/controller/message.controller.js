import Message from "../models/message.model.js";

export const getMessages =
async (req,res)=>{

    try{

        const myId = req.userId;

        const otherUser =
            req.params.userId;

        const messages =
            await Message.find({
                $or:[
                    {
                        sender:myId,
                        receiver:otherUser
                    },
                    {
                        sender:otherUser,
                        receiver:myId
                    }
                ]
            })
            .sort({createdAt:1});

        return res.status(200).json({
            success:true,
            messages
        });

    }catch(error){

        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};