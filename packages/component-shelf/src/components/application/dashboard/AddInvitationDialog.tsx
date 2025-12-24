"use client";

import { useEffect, useState, useRef } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { toast } from "sonner";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Switch } from "../../../components/ui/switch";
import { Label } from "../../../components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { User, UserPlus, Users, Plus, Trash2 } from "lucide-react";
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
    <Sheet
      open={isOpen}
      onOpenChange={(open) => (open ? openDialog() : handleClose())}
    >
      <SheetTrigger asChild>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Invitation
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-serif text-xl">
            Add New Invitation
          </SheetTitle>
          <SheetDescription className="text-base">
            Create an invitation for a single guest, guest with +1, or a group
            of guests.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col flex-1 px-4"
          >
            <div className="space-y-5 flex-1">
              <div className="space-y-3">
                <FormLabel className="text-base">Invitation Type</FormLabel>
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
                    <span className="text-sm">Single</span>
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
                    <span className="text-sm">Guest +1</span>
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
                    <span className="text-sm">Group</span>
                  </Button>
                </div>
              </div>

              {watchedInvitationType === "group" && (
                <FormField
                  control={form.control}
                  name="groupName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Group Name</FormLabel>
                      <FormControl>
                        <Input
                          className="text-base h-11"
                          placeholder="e.g., The Smith Family"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {watchedInvitationType === "group" ? (
                <div className="space-y-3">
                  <FormLabel className="text-base">Guest Names</FormLabel>
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
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                  className="text-base h-11 pl-10"
                                  placeholder="Full name"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            {fields.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="shrink-0 h-11 w-11"
                                onClick={() => remove(index)}
                              >
                                <Trash2 className="h-5 w-5" />
                              </Button>
                            )}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2 h-11 text-base"
                    onClick={() => append({ value: "" })}
                  >
                    <Plus className="h-5 w-5" />
                    Add Guest
                  </Button>
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="guestName"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Guest Name</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          as written on invitation
                        </p>
                      </div>
                      <FormControl>
                        <Input
                          className="text-base h-11"
                          placeholder="Full name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Email (optional)
                      </FormLabel>
                      {watchedInvitationType === "group" && (
                        <p className="text-sm text-muted-foreground">
                          primary contact for the group
                        </p>
                      )}
                    </div>
                    <FormControl>
                      <Input
                        className="text-base h-11"
                        type="email"
                        placeholder="guest@email.com"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {watchedInvitationType === "plusone" && (
                <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-4">
                  <UserPlus className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <p className="text-base font-medium">Plus One Enabled</p>
                    <p className="text-sm text-muted-foreground">
                      Guest can bring one additional person
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between space-x-2 py-2">
                <Label
                  htmlFor="add-another"
                  className="text-base font-normal cursor-pointer"
                >
                  Add another invitation
                </Label>
                <Switch
                  id="add-another"
                  checked={addAnother}
                  onCheckedChange={setAddAnother}
                />
              </div>
            </div>

            <SheetFooter className="px-0 pt-6">
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
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
