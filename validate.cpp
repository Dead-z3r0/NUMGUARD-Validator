#include<bits/stdc++.h>
#include <chrono>
#define ll long long int
#define in_arr(arr, n) for(int i=0;i<n;i++) cin>>arr[i];
#define in_2arr(arr, n,m) for(int i=0;i<n;i++) for(int j=0;j<m;j++) cin>>arr[i][j];
#define out_arr(arr, n) for(int i=0;i<n;i++) cout<<arr[i]<<" "; cout<<endl;
#define mod 1000000007
#define vi vector
#define ss second
#define ff first
#define pb push_back
#define yes cout<<"YES"<<endl;
#define no cout<<"NO"<<endl;
using namespace std;
using namespace chrono;

// imp functions i use
ll binToDec(string s) { return bitset<64>(s).to_ullong(); } // change the bitset according to your needs
string decToBin(ll a) { return bitset<64>(a).to_string(); }
ll pow(ll a,ll b){if(b==0){ return 1;} ll x=pow(a,b/2);if(b&1){return x*x*a;}else{return x*x;}}


bool isValid(string &cardno){
    string val_cardno="";
    for(char c:cardno){
        if(isdigit(c)){
            val_cardno+=c;
        }
    }
    int Digitlen=val_cardno.length();
    if(Digitlen<13 || Digitlen>19)return false;
    int sum=0;
    bool second=false;
    for(int i=Digitlen-1;i>=0;i--){
        int cardDig=val_cardno[i]-'0';
        if(second)cardDig*=2;
        sum+=cardDig/10;sum+=cardDig%10;
        second=!second;// this acts as tog(imp hai)
    }
    if(sum%10==0)return true;
    return false;
}

void solve(){
    return;
}
int main(int argc, char* argv[]) {
    // #ifndef ONLINE_JUDGE
    // freopen("input.txt", "r", stdin);
    // freopen("output.txt", "w", stdout);
    // #endif
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    // MAIN CODE FOR Validation
    if(argc<2){
        cerr<<"Error: There's no input given in the cmd line arg"<<endl;
        return 1;
    }
    string card_number=argv[1];
    bool check=isValid(card_number);
    if(check){
        cout<<"True"<<endl;
    }
    else{
        cout<<"False"<<endl;
    }
    return 0;
    // auto stop1 = high_resolution_clock::now();
    // auto duration = duration_cast<microseconds>(stop1 - start1);
    //cerr << "Time: " << duration.count() / 1000 << " ms" << endl;
}