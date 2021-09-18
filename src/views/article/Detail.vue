<template>
    <div class="article-detail">
        <div class="header" v-if="articleDetail.author">
            <img :src="articleDetail.author.avatar" class="avatar" />
            <div class="author-info">
                <div class="username">{{ articleDetail.author.name }}</div>
                <div class="create-time">{{ articleDetail.author.createdAt }}</div>
            </div>
            <div class="article-tags">
                <div class="tag-item" v-for="(item, index) in articleTags" :key="index">{{ item }}</div>
            </div>
        </div>
        <div class="article-con">
            <div class="title">
                {{ articleDetail.title }}
                <div class="btn-toedit" @click="editArticle" v-if="userInfo.uid == articleDetail.author_id">编辑</div>
            </div>
            <div class="short-intro">{{ articleDetail.short_intro }}</div>
            <div class="content" v-html="articleDetail.content"></div>
        </div>
        <div class="article-comment">
            <div class="add-comment">
                <input type="text" v-model="commentContent" class="ipt-comment" />
                <div class="btn-comment" @click="comment">评论一发</div>
            </div>
            <div class="comments" v-if="articleDetail.comments">
                <div class="comment-item" v-for="(item, index) in articleDetail.comments" :key="index">
                    <div class="item-userinfo">
                        <div class="item-userimg">
                            <img :src="item.user_head_pic" />
                        </div>
                        <div class="item-username">{{ item.user_name }}</div>
                        <div class="item-time">{{ item.createdAt }}</div>
                    </div>
                    <div class="item-content">{{ item.content }}</div>
                    <div class="item-bottom-info">
                        <div class="item-up-num">
                            <i class="hey-icondianzan"></i>
                            {{ item.up_num }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
    data() {
        return {
            articleDetail: {
                content: "",
                tags: "",
            },
            commentContent: "",
        };
    },
    computed: {
        ...mapState({
            userInfo: (state) =>
                state.Auth.userInfo
                    ? state.Auth.userInfo
                    : {
                          avatar: "",
                      },
        }),
        articleTags() {
            let that = this;
            return that.articleDetail.tags.split(";");
        },
    },
    created() {
        let that = this;
        that.articleId = that.$route.params.id;
        that.getArticleDetail({
            id: that.articleId,
        }).then((res) => {
            that.articleDetail = res.data.article;
            that.$set(that.articleDetail, "author", res.data.author);
            that.$set(that.articleDetail, "comments", res.data.comments);
        });
    },
    methods: {
        ...mapActions("Article", ["getArticleDetail", "commentArticle"]),
        editArticle() {
            let that = this;
            that.$router.push({
                path: "/release-article",
                query: {
                    id: that.articleDetail.id,
                },
            });
        },
        comment() {
            let that = this;
            if (!that.userInfo.id) {
                console.log("去登录");
                return;
            } else {
                that.commentArticle({
                    article_id: that.articleDetail.id,
                    user_id: that.userInfo.uid,
                    user_name: that.userInfo.name,
                    user_head_pic: that.userInfo.avatar,
                    content: that.commentContent,
                }).then((res) => {
                    if (res.code == 0) {
                        that.articleDetail.comments.unshift(res.data);
                    }
                });
            }
        },
    },
};
</script>

<style lang="less">
.article-detail {
    .header {
        position: relative;
        height: 80px;
        display: flex;
        width: 640px;
        margin: 0 auto;
        background: #fff;
        padding: 0 20px;
        margin-bottom: 15px;

        .article-tags {
            position: absolute;
            display: flex;
            right: 0;
            height: 100%;
            align-items: center;

            .tag-item {
                position: relative;
                padding: 0 10px;
                border-radius: 4px;
                border: 1px #21a0fe solid;
                height: 25px;
                line-height: 25px;
                color: #21a0fe;
                font-size: 12px;
                margin: 0 5px;
            }
        }

        .avatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin-top: 10px;
        }

        .author-info {
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            justify-content: center;

            .username {
                font-size: 16px;
                color: #333;
                margin: 5px 0;
            }
            .create-time {
                font-size: 12px;
                color: #999;
                margin: 5px 0;
            }
        }
    }
    .article-con {
        position: relative;
        width: 640px;
        margin: 0 auto;
        background: #fff;
        padding: 20px;

        .title {
            position: relative;
            line-height: 40px;
            font-size: 30px;
            font-weight: bold;
            color: #333;

            .btn-toedit {
                position: absolute;
                right: 0;
                top: 5px;
                font-size: 14px;
                font-weight: normal;
                padding: 0 10px;
                border-radius: 4px;
                border: 1px #21a0fe solid;
                color: #21a0fe;
                height: 30px;
                line-height: 30px;
                cursor: pointer;
            }
        }

        .short-intro {
            font-size: 12px;
            color: #999;
        }
        .content {
            margin-top: 20px;
        }
    }
    .article-comment {
        position: relative;
        width: 640px;
        margin: 0 auto;
        background: #fff;
        padding: 20px;
        margin-top: 20px;
        .add-comment {
            position: relative;
            height: 70px;
            display: flex;
            align-items: center;
            .ipt-comment {
                flex-grow: 1;
                height: 35px;
                padding: 0 10px;
            }
            .btn-comment {
                width: 100px;
                height: 35px;
                border-radius: 4px;
                background: #21a0fe;
                line-height: 35px;
                color: #fff;
                text-align: center;
                font-size: 14px;
                margin-left: 10px;
                cursor: pointer;
            }
        }
        .comment-item {
            margin-bottom: 20px;
            border-bottom: 1px #e5e5e5 solid;
            .item-content {
                margin: 10px 0 10px 60px;
                line-height: 20px;
                padding: 10px;
                background: #f7f7f7;
                font-size: 14px;
            }
            .item-userinfo {
                position: relative;
                display: flex;
                align-items: center;
                .item-userimg {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    overflow: hidden;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    margin-right: 10px;
                }
            }
            .item-time {
                position: absolute;
                right: 0;
                font-size: 12px;
                color: #999;
            }
        }
        .item-bottom-info {
            height: 40px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            font-size: 12px;
            color: #666;
            .item-up-num {
                margin-right: 10px;
            }
        }
    }
}
</style>
