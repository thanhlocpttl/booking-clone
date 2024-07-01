"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Spinner,
} from "@nextui-org/react";
import MailIcon from "./MailIcon";
import LockIcon from "./LockIcon";
import { Controller, set, useForm } from "react-hook-form";
import { data } from "autoprefixer";
import authApi from "@/api/authApi";
interface ISignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export default function Register() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenVerify,
    onOpen: onOpenVerify,
    onClose: onCloseVerify,
  } = useDisclosure();

  const { control, handleSubmit } = useForm<ISignUpForm>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ISignUpForm) => {
    setLoading(true);
    try {
      const response = await authApi.register(data.email, data.password);
      console.log(response);
      setEmail(data.email);
      onClose();
      onOpenVerify();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const onSubmitVerifyCode = async () => {
    setLoading(true);
    try {
      const response = await authApi.verify(email, code);
      console.log(response);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onPress={onOpen}
        className=" text-text_color font-semibold text-lg p-1 rounded bg-white "
      >
        Đăng ký
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Đăng ký</ModalHeader>
          <ModalBody>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  onChange={field.onChange}
                  value={field.value}
                  autoFocus
                  label="Họ tên"
                  placeholder="Nhập họ tên "
                  variant="bordered"
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  onChange={field.onChange}
                  value={field.value}
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Nhập email của bạn"
                  variant="bordered"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  onChange={field.onChange}
                  value={field.value}
                  label="Password"
                  placeholder="Nhập mật khẩu"
                  type="password"
                  variant="bordered"
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  onChange={field.onChange}
                  value={field.value}
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password Again"
                  placeholder="Nhập lại mật khẩu"
                  type="password"
                  variant="bordered"
                />
              )}
            />
          </ModalBody>

          <ModalFooter>
            <Button color="danger" variant="flat" onClick={onClose}>
              Đóng
            </Button>

            <Button
              color="primary"
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
            >
              {loading ? <Spinner color="white" /> : "Đăng ký"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenVerify}
        onClose={onCloseVerify}
        placement="top-center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Xác thực đăng ký
          </ModalHeader>
          <ModalBody>
            <Input
              label="Xác thực"
              placeholder="Nhập mã xác thực"
              value={code}
              onValueChange={(val) => setCode(val)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onClick={onCloseVerify}>
              Đóng
            </Button>

            <Button color="primary" onClick={onSubmitVerifyCode}>
              Xác thực
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
