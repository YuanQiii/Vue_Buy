import dayjs from "dayjs";
import {setToken} from "@/utils/auth";
import {mapMutations} from "vuex";

export const loginLogic = {
    data() {
        return {
            testPassword: "123456",
            telReg: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
            telRules: [
                {
                    require: true,
                    message: "手机号码不能为空",
                    trigger: "onBlur",
                },
                {
                    validator: (value) => {
                        return this.telReg.test(value);
                    },
                    message: "请输入正确格式的手机号码",
                    trigger: "onBlur",
                },
            ],
            pwdRules: [
                {
                    require: true,
                    message: "手机号码不能为空",
                    trigger: "onBlur",
                },
                {
                    validator: (value) => {
                        return value === this.testPassword;
                    },
                    message: "请输入正确的密码",
                    trigger: "onBlur",
                },
            ],
            captchaRules: [
                {
                    require: true,
                    message: "验证码不能为空",
                    trigger: "onBlur",
                },
                {
                    validator: (value) => {
                        if(value !== ''){
                            return value === String(this.captcha);
                        }else{
                            return false
                        }
                    },
                    message: "请输入正确的验证码",
                    trigger: "onBlur",
                },
            ]
        }
    },
    ...mapMutations("user", ["UPDATE_USER_INFO"]),
    methods: {
        loginSuccess(response) {
            let tempData = response.data;
            this.UPDATE_USER_INFO({
                ...tempData.data,
                phone: this.tel,
                birthday: dayjs().format("YYYY-MM-DD"),
                rememberMe: this.rememberMe,
            });
            setToken(tempData.data.token);
            this.$router.replace({
                name: "mine",
            });
        }
    }
}