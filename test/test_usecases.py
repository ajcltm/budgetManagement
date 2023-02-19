import unittest
from budgetManagement import usecases
from datetime import date
import random

# ======= Requirement ======== 

def create_many_rqm(num):
    fields = ['forRqer','forMonth', 'acc', 'payDate', 'dsc', 'amt']
    forRqer_lst = ['이슬기', '김광덕']
    forMonth_lst = [date(2023,1,1)]
    acc_lst = ['식비', '동이', '여가', '병원비', '유류비', '생활비']
    payDate_lst = [date(2022,12,10), date(2022,12,17),date(2022,12,25),date(2022,12,29)]
    dsc_lst = ['마트에서 구매', '쿠팡으로 주문', '급하게 밤에 주문', '동네 마트에서 장본거', '여행가서 점심먹음']
    amt_lst = [21_500, 8_700, 78_000]
    lst_lst = [forRqer_lst, forMonth_lst, acc_lst, payDate_lst, dsc_lst, amt_lst]
    data = []
    for i in range(num):
        data.append({fields[idx] : random.choice(lst) for idx, lst in enumerate(lst_lst)})
    return data

class Test_requirement(unittest.TestCase):

    @unittest.skip("")
    def test_register_requirement(self):
        data = create_many_rqm(10)
        for r in data:
            print(r)
            usecases.register_requirement(**r)

    @unittest.skip("")
    def test_change_requirement(self):
        r = {'acc':'변경된 데이터', 'payDate':date(2022,9,29), 'dsc':"변경된 데이터", 'pybDate':date(2023,1,23)}
        id ='230124140344-1622-2622'
        usecases.change_requirement(id=id,**r)
    
    @unittest.skip("")
    def test_delete_requirement(self):
        id = '230124140344-1622-2622'
        usecases.delete_requirement(id=id)

    @unittest.skip("")
    def test_query_requirement(self):
        data = create_many_rqm(10)
        for r in data:
            print(r)
            usecases.register_requirement(**r)
        data = usecases.query_requirement(forRqer='="이슬기"', pybDate='is not null')
        print(data)

# ======= Budget ======== 

def create_budget():
    acc_lst = ['식비', '동이', '여가', '병원비', '유류비', '생활비', '비상금']
    amt_lst = [500_000, 300_000, 300_000, 100_000, 100_000, 100_000, 200_000]
    data = []
    for i in range(0, len(acc_lst)):
        data.append({'dpser':'이슬기','dpsDate':date(2022,12,25), 'forMonth':date(2023,1,1), 'acc':acc_lst[i], 'amt':amt_lst[i]}) 
    return data


class Test_budget(unittest.TestCase):

    @unittest.skip("")
    def test_register_budget(self):
        data = create_budget()
        for b in data:
            print(b)
            usecases.deposit_budget(**b)

    @unittest.skip("")
    def test_change_budget(self):
        b = {'acc':'변경된 데이터', 'amt':1_000_000}
        id = '230114013028-2012-2350'
        usecases.change_budget(id=id,**b)
    
    @unittest.skip("")
    def test_delete_budget(self):
        id = '230114013028-2012-1237'
        usecases.delete_budget(id=id)

    @unittest.skip("")
    def test_query_budget(self):
        data = create_budget()
        for b in data:
            print(b)
            usecases.register_budget(**b)
        data = usecases.query_budget(acc='="비상금"')
        print(data)

class Test_report(unittest.TestCase):

    def test_query_monthly_account_budget(self):
        date = usecases.query_monthly_account_budget()
        print(date)

if __name__ == '__main__':
    unittest.main()
