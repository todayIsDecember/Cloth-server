import {
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ async: false })
class IsArrayOfStringArraysConstraint implements ValidatorConstraintInterface {
	validate(value: any): boolean {
		if (!Array.isArray(value)) return false;
		return value.every(
			(item: any) => Array.isArray(item) && item.every((subItem) => typeof subItem === 'string'),
		);
	}

	defaultMessage(): string {
		return 'значення повинно бути масив масивів рядків';
	}
}

export function IsArrayOfStringArrays(validationOptions?: ValidationOptions) {
	return function (object: any, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsArrayOfStringArraysConstraint,
		});
	};
}
