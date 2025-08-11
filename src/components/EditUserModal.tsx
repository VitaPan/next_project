'use client';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner"
import type { IUserCard } from '@/shared/types/userCard.interface';
import { useEffect, useState } from 'react';
import { useUserContext } from '@/shared/context/UserContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    username: z.string().min(1, 'Username is required'),
    email: z.string().email('Invalid email'),
    company: z.object({
        name: z.string().min(1, 'Company name is required'),
    }),
    address: z
        .object({
            city: z.string(),
            street: z.string(),
            zipcode: z.string(),
        })
        .optional(),
    phone: z.string(),
    website: z.string().min(1, 'Website is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
    user: IUserCard;
    mode?: 'add' | 'edit';
    onSave?: (user: IUserCard) => void;
}

export function EditUserModal({ user, mode = 'edit' }: Props) {
    const { updateUser, addUser } = useUserContext();
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: user,
    });

    useEffect(() => {
        if (open) {
            reset(user);
        }
    }, [open, user, reset]);

    const onSubmit = (data: FormData) => {
        const isAdd = mode === 'add';

        const newUser: IUserCard = {
            id: isAdd ? Date.now() : user.id,
            name: data.name,
            username: data.username,
            email: data.email,
            phone: data.phone,
            website: data.website,
            company: { name: data.company.name },
            address: isAdd
                ? { city: '', street: '', zipcode: '' }
                : {
                    city: data.address?.city ?? '',
                    street: data.address?.street ?? '',
                    zipcode: data.address?.zipcode ?? '',
                },
        };

        if (isAdd) {
            addUser(newUser);
        } else {
            updateUser(newUser);
        }
        setOpen(false);
        toast.success("Success", { description: mode === 'add' ? "User added" : "User updated" });
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant={mode === 'add' ? 'default' : 'outline'}
                    aria-label={mode === 'add' ? 'Open add user form' : 'Open edit user form'}
                >
                    {mode === 'add' ? 'Add user' : 'Edit'}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90dvh] p-0 overflow-hidden">
                <ScrollArea className="h-[calc(90dvh-64px)] px-6 py-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle className='mb-6'>
                                {mode === 'add' ? 'Add user' : 'Edit profile'}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label>Name</Label>
                                <Input {...register('name')} />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                                )}
                            </div>
                            <div className="grid gap-3">
                                <Label>Username</Label>
                                <Input {...register('username')} />
                                {errors.username && (
                                    <p className="text-red-500 text-sm">{errors.username.message}</p>
                                )}
                            </div>
                            <div className="grid gap-3">
                                <Label>Email</Label>
                                <Input {...register('email')} />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="grid gap-3">
                                <Label>Company</Label>
                                <Input {...register('company.name')} />
                                {errors.company?.name && (
                                    <p className="text-red-500 text-sm">
                                        {errors.company.name.message}
                                    </p>
                                )}
                            </div>

                            {mode === 'edit' && (
                                <>
                                    <div className="grid gap-3">
                                        <Label>City</Label>
                                        <Input {...register('address.city')} />
                                        {errors.address?.city && (
                                            <p className="text-red-500 text-sm">
                                                {errors.address.city.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid gap-3">
                                        <Label>Street</Label>
                                        <Input {...register('address.street')} />
                                        {errors.address?.street && (
                                            <p className="text-red-500 text-sm">
                                                {errors.address.street.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid gap-3">
                                        <Label>Zipcode</Label>
                                        <Input {...register('address.zipcode')} />
                                        {errors.address?.zipcode && (
                                            <p className="text-red-500 text-sm">
                                                {errors.address.zipcode.message}
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}

                            <div className="grid gap-3">
                                <Label>Phone</Label>
                                <Input {...register('phone')} />
                            </div>
                            <div className="grid gap-3">
                                <Label>Website</Label>
                                <Input {...register('website')} />
                                {errors.website && (
                                    <p className="text-red-500 text-sm">
                                        {errors.website.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <DialogFooter className="sticky bottom-0 bg-background border-t px-4 py-3">
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => reset(user)}
                                    aria-label="Cancel editing and close the form"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                aria-label={mode === 'add' ? 'Save new user' : 'Save updated user information'}
                            >
                                {mode === 'add' ? 'Add user' : 'Save changes'}
                            </Button>
                        </DialogFooter>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog >
    );
}