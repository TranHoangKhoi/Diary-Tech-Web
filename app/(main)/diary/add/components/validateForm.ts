import { z } from "zod";

export const generateSchema = (fields: any[]) => {
  const schema: Record<string, any> = {};

  fields.forEach((field) => {
    let validator;

    switch (field.field_type) {
      case "text":
        validator = z.string();
        break;

      case "number":
        validator = z.string().refine((val) => !isNaN(Number(val)), {
          message: "Phải là số",
        });
        break;

      case "date":
        validator = z.string().refine((val) => !isNaN(Date.parse(val)), {
          message: "Ngày không hợp lệ",
        });
        break;

      case "image":
        validator = z.preprocess(
          (val) => {
            if (val instanceof FileList) {
              return Array.from(val);
            }
            return val;
          },
          z
            .array(z.instanceof(File))
            .refine(
              (files) => files.every((f) => f.type.startsWith("image/")),
              {
                message: "File phải là ảnh",
              }
            )
        );

        if (field.is_required) {
          validator = validator.min(1, `${field.field_name} là bắt buộc`);
        } else {
          validator = validator.optional().default([]);
        }

        break;

      default:
        validator = z.string();
    }

    if (field.is_required) {
      validator = validator.refine((val) => val !== "" && val !== undefined, {
        message: `${field.field_name} là bắt buộc`,
      });
    } else {
      validator = validator.optional();
    }

    schema[field._id] = validator;
  });

  return z.object(schema);
};
