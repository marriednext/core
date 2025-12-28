"use client";

import { useEffect, useState, useRef } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { toast } from "sonner";
import clsx from "clsx";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Switch } from "../../ui/switch";
import { Label } from "../../ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import {
  User,
  UserPlus,
  Users,
  Plus,
  Trash2,
  Mail,
  InfoIcon,
} from "lucide-react";
import { useAddInvitationDialogStore } from "../../../stores/addInvitationDialogStore";

export type AddInvitationPayload = {
  guests: string[];
  hasPlusOne: boolean;
  inviteGroupName: string | null;
  email: string | null;
};

const addInvitationSchema = z.object({
  invitationType: z.enum(["single", "plusone", "group"]),
  groupName: z.string().optional(),
  guestName: z.string().optional(),
  guestNames: z.array(z.object({ value: z.string() })),
  email: z
    .union([z.string().email("Invalid email"), z.literal(""), z.null()])
    .optional(),
});

type AddInvitationFormData = z.infer<typeof addInvitationSchema>;

interface AddInvitationDialogProps {
  onSubmit?: (data: AddInvitationPayload) => void;
  isSubmitting?: boolean;
}

interface FormSectionProps {
  title: string;
  optional?: boolean;
  children: React.ReactNode;
  className?: string;
}

function FormSection({
  title,
  optional,
  children,
  className,
}: FormSectionProps) {
  return (
    <div className={clsx("space-y-4", className)}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </span>
        {optional && (
          <span className="text-sm text-muted-foreground/60">optional</span>
        )}
      </div>
      {children}
    </div>
  );
}

const defaultValues: AddInvitationFormData = {
  invitationType: "single",
  groupName: "",
  guestName: "",
  guestNames: [{ value: "" }],
  email: "",
};

export function AddInvitationDialog({
  onSubmit,
  isSubmitting = false,
}: AddInvitationDialogProps) {
  const {
    isOpen,
    invitationType,
    openDialog,
    closeDialog,
    setInvitationType,
    reset: resetStore,
  } = useAddInvitationDialogStore();

  const [addAnother, setAddAnother] = useState(false);
  const lastSubmittedGuestsRef = useRef<string[] | null>(null);
  const lastInvitationTypeRef = useRef<"single" | "plusone" | "group">(
    "single"
  );
  const wasSubmittingRef = useRef(false);

  const form = useForm<AddInvitationFormData>({
    resolver: zodResolver(addInvitationSchema as any),
    defaultValues: {
      ...defaultValues,
      invitationType,
    },
  });

  const { fields, append, remove } = useFieldArray<AddInvitationFormData>({
    control: form.control,
    name: "guestNames",
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        ...defaultValues,
        invitationType,
      });
    } else {
      form.reset({
        ...defaultValues,
        invitationType: "single",
      });
    }
  }, [isOpen, invitationType, form]);

  useEffect(() => {
    if (
      wasSubmittingRef.current &&
      !isSubmitting &&
      lastSubmittedGuestsRef.current
    ) {
      const guests = lastSubmittedGuestsRef.current;
      const guestNamesText =
        guests.length === 1
          ? guests[0]
          : guests.length === 2
          ? `${guests[0]} and ${guests[1]}`
          : `${guests[0]} and ${guests.length - 1} others`;

      toast.success("Invitation added", {
        description: guestNamesText,
      });

      if (addAnother && !isOpen) {
        const timer = setTimeout(() => {
          form.reset({
            ...defaultValues,
            invitationType: lastInvitationTypeRef.current,
          });
          setInvitationType(lastInvitationTypeRef.current);
          openDialog();
        }, 100);
        return () => clearTimeout(timer);
      }

      lastSubmittedGuestsRef.current = null;
    }
    wasSubmittingRef.current = isSubmitting;
  }, [isSubmitting, addAnother, isOpen, form, invitationType, openDialog]);

  const handleClose = () => {
    closeDialog();
    resetStore();
    setAddAnother(false);
    form.reset({
      ...defaultValues,
      invitationType: "single",
    });
  };

  const handleSubmit = (data: AddInvitationFormData) => {
    const guests =
      data.invitationType === "group"
        ? (data.guestNames || [])
            .map((item) => item.value)
            .filter((name) => name.trim() !== "")
        : data.guestName?.trim()
        ? [data.guestName.trim()]
        : [];

    if (guests.length === 0) {
      return;
    }

    const payload: AddInvitationPayload = {
      guests,
      hasPlusOne: data.invitationType === "plusone",
      inviteGroupName:
        data.invitationType === "group" ? data.groupName?.trim() || null : null,
      email: data.email?.trim() || null,
    };

    if (onSubmit) {
      lastSubmittedGuestsRef.current = guests;
      lastInvitationTypeRef.current = data.invitationType;
      wasSubmittingRef.current = true;
      onSubmit(payload);
    } else {
      handleClose();
    }
  };

  const watchedInvitationType = useWatch({
    control: form.control,
    name: "invitationType",
    defaultValue: invitationType,
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => (open ? openDialog() : handleClose())}
    >
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Invitation
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto pt-6">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            Add New Invitation
          </DialogTitle>
          <DialogDescription className="text-lg">
            Create an invitation for a single guest, guest with +1, or a group
            of guests.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col flex-1"
          >
            <div className="flex-1 space-y-6 pb-6">
              <FormSection title="Invitation Type">
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    type="button"
                    variant={
                      watchedInvitationType === "single" ? "default" : "outline"
                    }
                    className="flex-col h-auto py-4 gap-1.5"
                    onClick={() => setInvitationType("single")}
                  >
                    <User className="h-6 w-6" />
                    <span className="text-base">Single</span>
                  </Button>
                  <Button
                    type="button"
                    variant={
                      watchedInvitationType === "plusone"
                        ? "default"
                        : "outline"
                    }
                    className="flex-col h-auto py-4 gap-1.5"
                    onClick={() => setInvitationType("plusone")}
                  >
                    <UserPlus className="h-6 w-6" />
                    <span className="text-base">Guest +1</span>
                  </Button>
                  <Button
                    type="button"
                    variant={
                      watchedInvitationType === "group" ? "default" : "outline"
                    }
                    className="flex-col h-auto py-4 gap-1.5"
                    onClick={() => setInvitationType("group")}
                  >
                    <Users className="h-6 w-6" />
                    <span className="text-base">Group</span>
                  </Button>
                </div>
              </FormSection>

              <FormSection title="Guest Details">
                {watchedInvitationType === "group" && (
                  <div className="mb-6">
                    <FormField
                      control={form.control}
                      name="groupName"
                      render={({ field }) => (
                        <FormItem>
                          <div className="mb-2">
                            <FormLabel className="text-lg font-semibold">
                              Name of the group (optional)
                            </FormLabel>
                            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-0.5">
                              <InfoIcon className="h-4 w-4" />
                              Guests in group can use this name to RSVP to the
                              event.
                            </p>
                          </div>
                          <FormControl>
                            <Input
                              className="h-11 text-base"
                              placeholder="e.g., The Smith Family"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {watchedInvitationType === "group" ? (
                  <div className="space-y-3 ">
                    <div className="mb-2">
                      <FormLabel className="text-lg font-semibold">
                        Guest Names{" "}
                        <span className="text-destructive font-bold">*</span>
                      </FormLabel>
                      <p className="text-sm text-muted-foreground flex items-center gap-2 mt-0.5">
                        Full name as written on the invitation
                      </p>
                    </div>
                    {fields.map((field, index) => (
                      <FormField
                        key={field.id}
                        control={form.control}
                        name={`guestNames.${index}.value`}
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center gap-2">
                              <FormControl>
                                <div className="relative flex-1">
                                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    className="h-11 pl-10 text-base"
                                    placeholder="Enter name here"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              {fields.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="shrink-0 h-11 w-11 text-muted-foreground hover:text-destructive"
                                  onClick={() => remove(index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-fit gap-2 h-10"
                        onClick={() => append({ value: "" })}
                      >
                        <Plus className="h-4 w-4" />
                        Add Guest
                      </Button>
                    </div>
                  </div>
                ) : (
                  <FormField
                    control={form.control}
                    name="guestName"
                    render={({ field }) => (
                      <FormItem>
                        <div className="mb-2">
                          <FormLabel className="text-lg font-semibold">
                            Guest Name{" "}
                            <span className="text-destructive font-bold">
                              *
                            </span>
                          </FormLabel>
                          {watchedInvitationType === "plusone" && (
                            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-0.5">
                              <UserPlus className="h-4 w-4" />
                              Guest can bring one additional person
                            </p>
                          )}
                        </div>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="h-11 pl-10 text-base"
                              placeholder="Full name as written on invitation"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </FormSection>

              <FormSection title="Additional Information" optional>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormLabel className="text-lg font-semibold">
                          Email
                        </FormLabel>
                        {watchedInvitationType === "group" && (
                          <p className="text-sm text-muted-foreground">
                            Primary contact for the group
                          </p>
                        )}
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            className="h-11 pl-10 text-base"
                            type="email"
                            placeholder="guest@email.com"
                            {...field}
                            value={field.value || ""}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormSection>
            </div>

            <DialogFooter className="flex-col gap-4 pt-6 sticky bottom-0 z-10 bg-background border-t border-border">
              <div className="flex flex-col gap-2 w-full items-center justify-center">
                <div className="flex items-center justify-between w-full mb-2">
                  <Label
                    htmlFor="add-another"
                    className="text-base font-normal cursor-pointer text-muted-foreground"
                  >
                    Add another invitation after saving
                  </Label>
                  <Switch
                    id="add-another"
                    checked={addAnother}
                    onCheckedChange={setAddAnother}
                  />
                </div>
                <div className="flex justify-end gap-2 w-full">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add Invitation"}
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
