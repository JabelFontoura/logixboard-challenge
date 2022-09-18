export class WeightConversionService {
  private static weightConversions = [
    {
      fromUnit: 'KILOGRAMS',
      toUnit: 'OUNCES',
      operator: '*',
      value: 35.274,
    },
    {
      fromUnit: 'POUNDS',
      toUnit: 'OUNCES',
      operator: '*',
      value: 16,
    },
    {
      fromUnit: 'OUNCES',
      toUnit: 'POUNDS',
      operator: '/',
      value: 16,
    },
    {
      fromUnit: 'KILOGRAMS',
      toUnit: 'POUNDS',
      operator: '*',
      value: 2.205,
    },
    {
      fromUnit: 'POUNDS',
      toUnit: 'KILOGRAMS',
      operator: '/',
      value: 2.205,
    },
    {
      fromUnit: 'OUNCES',
      toUnit: 'KILOGRAMS',
      operator: '/',
      value: 35.274,
    },
  ];

  static convert(fromUnit: string, toUnit: string, value: number): number {
    toUnit = toUnit.toUpperCase();
    const conversion = this.weightConversions.find((x) => x.fromUnit === fromUnit && x.toUnit === toUnit);

    if (fromUnit === toUnit) return value;

    switch (conversion?.operator) {
      case '*':
        return value * conversion.value;
      case '/':
        return value / conversion.value;
    }

    return 0;
  }

  static sumAndConvert(weights, unit): number {
    let weightSum = 0;

    for (let weight of weights) {
      weightSum += this.convert(weight.unit, unit, parseFloat(weight.weight));
    }

    return weightSum;
  }
}
