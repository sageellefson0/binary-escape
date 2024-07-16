import math

numbers = [1, -1, 2, 3]

def solution(numbers: list[int]) -> int:
    
    count = 0
    
    for i in range(len(numbers)):
        for j in range(i, len(numbers)):
            sum = numbers[i] + numbers[j]
            
            if sum > 0 and (math.log2(sum)).is_integer():
                count+=1
                
    return count

def solution2(numbers: list[int]) -> int:
    
    count = 0
    prevMap = set()
    
    for num in numbers:
            prevMap.add(num)
            
            for power in range(21):
                diff = 2**power - num
                if diff in prevMap:
                    count+=1
                
    return count


print(solution2(numbers))
            
        